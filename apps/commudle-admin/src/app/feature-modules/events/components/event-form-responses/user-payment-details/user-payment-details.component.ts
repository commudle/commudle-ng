import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventTicketOrderService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-user-payment-details',
  templateUrl: './user-payment-details.component.html',
  styleUrls: ['./user-payment-details.component.scss'],
})
export class UserPaymentDetailsComponent {
  @Input() eto;
  subscription: Subscription[] = [];
  constructor(private eventTicketOrderService: EventTicketOrderService) {}

  refund(eventTicketOrderId) {
    this.subscription.push(this.eventTicketOrderService.checkRefundAmount(eventTicketOrderId).subscribe((data) => {}));
  }
}
