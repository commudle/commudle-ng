import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventTicketOrderService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-user-payment-details',
  templateUrl: './user-payment-details.component.html',
  styleUrls: ['./user-payment-details.component.scss'],
})
export class UserPaymentDetailsComponent implements OnInit {
  @Input() eto;
  subscription: Subscription[] = [];
  constructor(private eventTicketOrderService: EventTicketOrderService) {}

  ngOnInit(): void {
    this.eto;
    console.log(
      '🚀 ~ file: user-payment-details.component.ts:17 ~ UserPaymentDetailsComponent ~ ngOnInit ~ this.eto;:',
      this.eto,
    );
  }

  refund(eventTicketOrderId) {
    this.subscription.push(
      this.eventTicketOrderService.checkRefundAmount(eventTicketOrderId).subscribe((data) => {
        console.log(
          '🚀 ~ file: user-payment-details.component.ts:25 ~ UserPaymentDetailsComponent ~ this.subscription.push ~ data:',
          data,
        );
      }),
    );
  }
}
