import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// import { EventTicketOrderService } from '@commudle/shared-services';
// import { NbDialogService } from '@commudle/theme';
import { IEventTicketOrder, IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-payment-details',
  templateUrl: './user-payment-details.component.html',
  styleUrls: ['./user-payment-details.component.scss'],
})
export class UserPaymentDetailsComponent implements OnInit {
  @Input() eto: IEventTicketOrder[];
  @Input() user: IUser;
  refundAmount: number;
  subscription: Subscription[] = [];
  paidUser;
  otherUsers: IUser[] = [];
  constructor() {} // private dialogService: NbDialogService, // private eventTicketOrderService: EventTicketOrderService,

  // @ViewChild('refundDialogBox') refundDialogBox: TemplateRef<any>;

  ngOnInit(): void {}

  // checkRefund(eventTicketOrderId) {
  //   this.subscription.push(
  //     this.eventTicketOrderService.checkRefundAmount(eventTicketOrderId).subscribe((data) => {
  //       this.refundAmount = data.refund_amount;
  //       this.open(eventTicketOrderId);
  //     }),
  //   );
  // }

  // createRefund(eventTicketOrderId) {
  //   this.subscription.push(this.eventTicketOrderService.createRefund(eventTicketOrderId).subscribe((data) => {}));
  // }

  // open(eventTicketOrderId) {
  //   this.dialogService.open(this.refundDialogBox, {
  //     context: eventTicketOrderId,
  //   });
  // }
}
