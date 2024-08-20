import { Component } from '@angular/core';
import { RazorpayService, ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';

@Component({
  selector: 'commudle-payment-logs',
  templateUrl: './payment-logs.component.html',
  styleUrls: ['./payment-logs.component.scss'],
})
export class PaymentLogsComponent {
  rzpPaymentId: '';
  constructor(
    private nbDialogService: NbDialogService,
    private rzpService: RazorpayService,
    private toastrService: ToastrService,
  ) {}

  openDialog(template) {
    this.rzpPaymentId = '';
    this.nbDialogService.open(template);
  }

  createPayment() {
    this.rzpService.createMissingRzpPayment(this.rzpPaymentId).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Payment details linked successfully');
      }
    });
  }
}
