import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentSettingService } from '@commudle/shared-services';
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
  constructor(private paymentSettingService: PaymentSettingService, private fb: FormBuilder) {
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
    this.fetchPaidTicketingData();
  }

  fetchPaidTicketingData() {
    this.subscriptions.push(
      this.paymentSettingService.indexPaymentSettings(this.edfeg.id).subscribe((data) => {
        if (data) {
          this.paymentData = data;
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
      this.paidTicketingForm.get('paid_ticket_setting').setValue({
        bank_ac_type: data.bank_ac_type,
        bank_ac_id: data.bank_ac_id,
        price: data.price,
        currency: data.currency,
      });
    });
  }
}
