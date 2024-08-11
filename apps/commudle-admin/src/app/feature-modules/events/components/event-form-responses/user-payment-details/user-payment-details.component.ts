import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// import { EventTicketOrderService } from '@commudle/shared-services';
// import { NbDialogService } from '@commudle/theme';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-payment-details',
  templateUrl: './user-payment-details.component.html',
  styleUrls: ['./user-payment-details.component.scss'],
})
export class UserPaymentDetailsComponent implements OnInit {
  @Input() eto;
  @Input() user: IUser;
  refundAmount: number;
  subscription: Subscription[] = [];
  paidUser;
  otherUsers: IUser[] = [];
  constructor() {} // private dialogService: NbDialogService, // private eventTicketOrderService: EventTicketOrderService,

  @ViewChild('refundDialogBox') refundDialogBox: TemplateRef<any>;

  ngOnInit(): void {
    for (const eto of this.eto) {
      for (const etoUser of eto.eto_users) {
        if (eto.user.id === etoUser.user_id) {
          this.paidUser = etoUser;
        } else if (eto.user.id !== etoUser.user_id) {
          this.otherUsers.push(etoUser);
        }
      }
    }
  }

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
