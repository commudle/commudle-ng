import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentSettingService, ToastrService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription } from 'rxjs';

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
          this.paidTicketingForm.get('paid_ticket_setting').setValue({
            bank_ac_type: 'stripe',
            bank_ac_id: data.bank_ac_id,
            price: data.price,
            currency: data.currency,
          });
        }
      }),
    );
  }

  createPaidTicketing() {
    this.paymentSettingService.createPaymentSettings(this.paidTicketingForm.value, this.edfeg.id).subscribe((data) => {
      this.toastrService.successDialog('Payment details has been updated');
      this.paymentData = data;
      this.paidTicketingForm.get('paid_ticket_setting').setValue({
        bank_ac_type: 'stripe',
        bank_ac_id: data.bank_ac_id,
        price: data.price,
        currency: data.currency,
      });
      this.close();
    });
  }

  updateTicketDetails() {
    this.paymentSettingService
      .updateTicketDetails(this.paidTicketingForm.value, this.paymentData.id)
      .subscribe((data) => {
        this.paymentData = data;
        this.toastrService.successDialog('Payment details has been updated');
        this.paidTicketingForm.get('paid_ticket_setting').setValue({
          bank_ac_type: 'stripe',
          bank_ac_id: data.bank_ac_id,
          price: data.price,
          currency: data.currency,
        });
        this.close();
      });
  }

  close() {
    this.dialogRef.close();
  }
}
