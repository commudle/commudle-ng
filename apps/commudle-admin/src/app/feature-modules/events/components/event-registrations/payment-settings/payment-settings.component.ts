import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentSettingService, ToastrService, countries_details } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription } from 'rxjs';
import { faPenToSquare, faTicket } from '@fortawesome/free-solid-svg-icons';
import { IPaymentDetail, IStripeAccount } from '@commudle/shared-models';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
@Component({
  selector: 'commudle-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss'],
})
export class PaymentSettingsComponent implements OnInit {
  @Input() communityId;
  @Input() edfeg: IEventDataFormEntityGroup;
  @Input() stripeAccounts: IStripeAccount[];
  countries = countries_details;
  paidTicketingForm: FormGroup;
  paymentData: IPaymentDetail;
  subscriptions: Subscription[] = [];
  paymentDetailsExist = false;

  icons = {
    faPenToSquare,
    faTicket,
  };

  dialogRef: NbDialogRef<any>;
  bankAccountNo: string;
  constructor(
    private paymentSettingService: PaymentSettingService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: ToastrService,
  ) {
    this.paidTicketingForm = this.fb.group(
      {
        paid_ticket_setting: this.fb.group({
          bank_ac_type: ['stripe', Validators.required],
          bank_ac_id: ['', Validators.required],
          price: ['', Validators.required],
          currency: ['', Validators.required],
          has_taxes: [false],
          tax_name: [''],
          tax_percentage: [''],
          seller_tax_details: [''],
          country: [''],
          seller_name: [''],
          seller_address: [''],
        }),
      },
      {
        validators: [
          (fb) =>
            fb.get('paid_ticket_setting').get('has_taxes').value === true &&
            !fb.get('paid_ticket_setting').get('tax_name').value
              ? {
                  tax_name: true,
                  tax_percentage: true,
                  seller_tax_details: true,
                  country: true,
                  seller_name: true,
                  seller_address: true,
                }
              : null,
        ],
      },
    );
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

  updatePaidTicketingForm(ticketDetails) {
    const selectedAccount = this.stripeAccounts.find(
      (stripeAccount) => stripeAccount.uuid === ticketDetails.bank_ac_id,
    );
    this.bankAccountNo = selectedAccount.details.external_accounts.data[0].last4;
    this.paidTicketingForm.get('paid_ticket_setting').patchValue({
      bank_ac_type: 'stripe',
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
    });
  }

  closeDialogBox() {
    this.dialogRef.close();
  }
}
