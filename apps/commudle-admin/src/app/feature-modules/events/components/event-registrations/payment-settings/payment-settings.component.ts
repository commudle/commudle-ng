import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentSettingService, ToastrService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription } from 'rxjs';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss'],
})
export class PaymentSettingsComponent implements OnInit {
  @Input() communityId;
  @Input() edfeg;
  @Input() stripeAccounts;
  paidTicketingForm;
  paymentData;
  subscriptions: Subscription[] = [];
  paymentDetailsExist = false;

  icons = {
    faPenToSquare,
  };

  dialogRef: NbDialogRef<any>;
  constructor(
    private paymentSettingService: PaymentSettingService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: ToastrService,
  ) {
    this.paidTicketingForm = this.fb.group({
      paid_ticket_setting: this.fb.group({
        bank_ac_type: ['stripe', Validators.required],
        bank_ac_id: ['', Validators.required],
        price: ['', Validators.required],
        currency: ['', Validators.required],
      }),
    });
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
      this.paymentSettingService.indexPaymentSettings(this.edfeg.id).subscribe((data) => {
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
    this.paymentSettingService.createPaymentSettings(this.paidTicketingForm.value, this.edfeg.id).subscribe((data) => {
      this.toastrService.successDialog('Payment details has been updated');
      this.paymentData = data;
      this.updatePaidTicketingForm(this.paymentData);
      this.close();
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
      .subscribe((data) => {
        this.paymentData = data;
        this.toastrService.successDialog('Payment details has been updated');
        this.updatePaidTicketingForm(this.paymentData);
        this.close();
      });
  }

  updatePaidTicketingForm(ticketDetails) {
    this.paidTicketingForm.get('paid_ticket_setting').setValue({
      bank_ac_type: 'stripe',
      bank_ac_id: ticketDetails.bank_ac_id,
      price: ticketDetails.price / 100,
      currency: ticketDetails.currency,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
