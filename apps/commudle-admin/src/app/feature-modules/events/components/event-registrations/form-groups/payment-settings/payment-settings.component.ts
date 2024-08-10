import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentSettingService, ToastrService, countries_details } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription, debounceTime } from 'rxjs';
import { faPenToSquare, faTicket } from '@fortawesome/free-solid-svg-icons';
import {
  IEvent,
  IPaymentDetail,
  IRazorpayAccount,
  IStripeAccount,
  EPaymentBanks,
  ICommunity,
} from '@commudle/shared-models';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { DiscountCouponFormComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-registrations/discount-coupons/discount-coupon-form/discount-coupon-form.component';
import { EDbModels } from '@commudle/shared-models';
import { CustomPageFormComponent } from 'apps/commudle-admin/src/app/app-shared-components/custom-page/custom-page-form/custom-page-form.component';
import { EPageType, ICustomPage } from 'apps/shared-models/custom-page.model';
import { Router } from '@angular/router';
@Component({
  selector: 'commudle-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss'],
})
export class PaymentSettingsComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() edfeg: IEventDataFormEntityGroup;
  @Input() stripeAccounts: IStripeAccount[];
  @Input() razorpayAccounts: IRazorpayAccount[];
  @Input() event: IEvent;
  @Input() refundPolicy: ICustomPage;

  countries = countries_details;
  paidTicketingForm: FormGroup;
  paymentData: IPaymentDetail;
  subscriptions: Subscription[] = [];
  paymentDetailsExist = false;
  EPaymentBanks = EPaymentBanks;

  icons = {
    faPenToSquare,
    faTicket,
  };

  dialogRef: NbDialogRef<any>;
  bankAccountNo: string;
  EDbModels = EDbModels;
  EPageType = EPageType;
  commudleFeePercentage = 2;
  commudleFeeAmount = 0;
  @ViewChild(CustomPageFormComponent) customPageFormComponent: CustomPageFormComponent;
  constructor(
    private paymentSettingService: PaymentSettingService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.paidTicketingForm = this.fb.group(
      {
        paid_ticket_setting: this.fb.group({
          bank_ac_type: ['', Validators.required],
          bank_ac_id: ['', Validators.required],
          price: ['', Validators.required],
          currency: ['inr', Validators.required],
          has_taxes: [false],
          tax_name: [''],
          tax_percentage: [''],
          seller_tax_details: [''],
          country: [''],
          seller_name: [''],
          seller_address: [''],
          multi_person_ticket: [false],
        }),
      },
      {
        validators: [
          (fb) =>
            fb.get('paid_ticket_setting').get('has_taxes').value === true &&
            !fb.get('paid_ticket_setting').get('tax_name').value
              ? {
                  tax_name: ['', Validators.required],
                  tax_percentage: ['', Validators.required],
                  seller_tax_details: ['', Validators.required],
                  country: ['', Validators.required],
                  seller_name: ['', Validators.required],
                  seller_address: ['', Validators.required],
                }
              : null,
        ],
      },
    );
    this.calculateCommudleFeeAmount();
  }

  ngOnInit(): void {
    if (this.edfeg.is_paid) this.fetchPaidTicketingData();
  }

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog);
  }

  fetchPaidTicketingData() {
    this.paymentDetailsExist = false;
    this.subscriptions.push(
      this.paymentSettingService.indexPaymentSettings(this.edfeg.id).subscribe((data: IPaymentDetail) => {
        if (data) {
          this.paymentData = data;
          this.paymentDetailsExist = true;
          this.commudleFeePercentage = data.commudle_fee_percentage;
          this.calculateCommudleFeeAmount();
          this.updatePaidTicketingForm(this.paymentData);
        }
      }),
    );
  }

  createPaidTicketing() {
    this.paidTicketingForm.patchValue({
      paid_ticket_setting: {
        price: this.paidTicketingForm.get('paid_ticket_setting.price').value * 100,
      },
    });
    this.paymentSettingService
      .createPaymentSettings(this.paidTicketingForm.value, this.edfeg.id)
      .subscribe((data: IPaymentDetail) => {
        this.toastrService.successDialog('Payment details has been created');
        this.paymentData = data;
        this.paymentDetailsExist = true;
        this.updatePaidTicketingForm(this.paymentData);
        this.closeDialogBox();
      });
  }

  updateTicketDetails() {
    this.paidTicketingForm.patchValue({
      paid_ticket_setting: {
        price: this.paidTicketingForm.get('paid_ticket_setting.price').value * 100,
      },
    });
    this.paymentSettingService
      .updateTicketDetails(this.paidTicketingForm.value, this.paymentData.id)
      .subscribe((data: IPaymentDetail) => {
        this.paymentData = data;
        this.toastrService.successDialog('Payment details has been updated');
        this.updatePaidTicketingForm(this.paymentData);
        this.closeDialogBox();
      });
  }

  updatePaidTicketingForm(ticketDetails: IPaymentDetail) {
    const selectedAccountS = this.stripeAccounts.find(
      (stripeAccount) => stripeAccount.uuid === ticketDetails.bank_ac_id,
    );
    const selectedAccountR = this.razorpayAccounts.find(
      (razorpayAccount) => razorpayAccount.uuid === ticketDetails.bank_ac_id,
    );
    this.bankAccountNo = selectedAccountS
      ? selectedAccountS.details.external_accounts.data[0].last4
      : selectedAccountR.bank_details.active_configuration.settlements.account_number.toString().slice(-4);
    let bankAcType: string;

    if (ticketDetails.bank_ac_type === EDbModels.RAZORPAY_LINKED_ACCOUNT) {
      bankAcType = 'razorpay';
    } else if (ticketDetails.bank_ac_type === EDbModels.STRIPE_CONNECT_ACCOUNT) {
      bankAcType = 'stripe';
    }
    this.paidTicketingForm.get('paid_ticket_setting').patchValue({
      bank_ac_type: bankAcType,
      bank_ac_id: ticketDetails.bank_ac_id,
      price: ticketDetails.price / 100,
      currency: ticketDetails.currency,
      has_taxes: ticketDetails.has_taxes,
      tax_name: ticketDetails.tax_name,
      tax_percentage: ticketDetails.tax_percentage,
      seller_tax_details: ticketDetails.seller_tax_details,
      country: ticketDetails.country,
      seller_name: ticketDetails.seller_name,
      seller_address: ticketDetails.seller_address,
      multi_person_ticket: ticketDetails.multi_person_ticket,
    });
  }

  openCreateDiscountDialog() {
    const dialogRef = this.dialogService.open(DiscountCouponFormComponent, {
      closeOnBackdropClick: true,
      autoFocus: true,
      hasScroll: false,
      context: { type: 'create', event: this.event },
    });
  }

  closeDialogBox() {
    this.dialogRef.close();
  }

  selectAccount(event) {
    const selectedAccountUuid = event.value;
    if (selectedAccountUuid === 'connect-bank-account') {
      this.closeDialogBox();
      this.router.navigate(['./admin', 'communities', this.community.slug, 'payments']);
      return;
    }
    const razorpayAccountSelected = this.razorpayAccounts.find((account) => account.uuid === selectedAccountUuid);
    const stripeAccountSelected = this.stripeAccounts.find((account) => account.uuid === selectedAccountUuid);
    if (razorpayAccountSelected) {
      this.paidTicketingForm.patchValue({
        paid_ticket_setting: {
          bank_ac_type: 'razorpay',
        },
      });
    }
    if (stripeAccountSelected) {
      this.paidTicketingForm.patchValue({
        paid_ticket_setting: {
          bank_ac_type: 'stripe',
        },
      });
    }
  }

  createOrUpdateRefundPage() {
    this.customPageFormComponent.createOrUpdate();
    this.dialogRef.close();
    this.community.has_refund_policy = true;
  }

  toggleHasTaxes(event) {
    if (!event) {
      this.paidTicketingForm.patchValue({
        tax_name: '',
        tax_percentage: '',
        seller_tax_details: '',
        country: '',
        seller_name: '',
        seller_address: '',
      });
    }
  }

  calculateCommudleFeeAmount() {
    this.paidTicketingForm
      .get('paid_ticket_setting.price')
      .valueChanges.pipe(debounceTime(200))
      .subscribe(() => {
        this.getCommudleFeeAmount();
      });
    this.paidTicketingForm
      .get('paid_ticket_setting.tax_percentage')
      .valueChanges.pipe(debounceTime(200))
      .subscribe(() => {
        this.getCommudleFeeAmount();
      });
  }

  getCommudleFeeAmount() {
    const priceValue = this.paidTicketingForm.get('paid_ticket_setting.price').value;
    const taxValue = this.paidTicketingForm.get('paid_ticket_setting.tax_percentage').value;
    this.paymentSettingService.calculateCommudleFeeAmount(priceValue, taxValue).subscribe((data) => {
      this.commudleFeeAmount = data;
    });
  }
}
