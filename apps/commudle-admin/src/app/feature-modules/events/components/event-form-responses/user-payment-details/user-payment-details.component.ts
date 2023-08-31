import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventTicketOrderService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';

@Component({
  selector: 'commudle-user-payment-details',
  templateUrl: './user-payment-details.component.html',
  styleUrls: ['./user-payment-details.component.scss'],
})
export class UserPaymentDetailsComponent {
  @Input() eto;
  refundAmount: number;
  subscription: Subscription[] = [];
  constructor(private eventTicketOrderService: EventTicketOrderService, private dialogService: NbDialogService) {}

  @ViewChild('refundDialogBox') refundDialogBox: TemplateRef<any>;

  checkRefund(eventTicketOrderId) {
    this.subscription.push(
      this.eventTicketOrderService.checkRefundAmount(eventTicketOrderId).subscribe((data) => {
        this.refundAmount = data.refund_amount;
        this.open(eventTicketOrderId);
      }),
    );
  }

  createRefund(eventTicketOrderId) {
    this.subscription.push(this.eventTicketOrderService.createRefund(eventTicketOrderId).subscribe((data) => {}));
  }

  open(eventTicketOrderId) {
    this.dialogService.open(this.refundDialogBox, {
      context: eventTicketOrderId,
    });
  }
}
