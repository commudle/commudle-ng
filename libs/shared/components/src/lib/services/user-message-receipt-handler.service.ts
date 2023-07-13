import { Injectable, OnDestroy } from '@angular/core';
import { UserMessageReceiptService } from '@commudle/shared-services';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserMessageReceiptHandlerService implements OnDestroy {
  private userMessageReceipts = new Array<{ user_message_id: number; seen_at: Date }>();

  private isSendingReceipts = false;
  private subscription: Subscription;

  constructor(private userMessageReceiptService: UserMessageReceiptService) {
    this.subscription = interval(10000).subscribe(() => this.sendReceipts());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sendReceipts();
  }

  addMessageReceipt(messageId: number, seenAt: Date): void {
    if (!this.userMessageReceipts.find((receipt) => receipt.user_message_id === messageId)) {
      this.userMessageReceipts.push({ user_message_id: messageId, seen_at: seenAt });
    }
  }

  sendReceipts(): void {
    if (this.isSendingReceipts || this.userMessageReceipts.length === 0) {
      return;
    }

    this.isSendingReceipts = true;
    this.userMessageReceiptService.createReceipt(this.userMessageReceipts).subscribe((response) => {
      if (response) {
        this.userMessageReceipts = [];
        this.isSendingReceipts = false;
      }
    });
  }
}
