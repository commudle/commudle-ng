import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StripeHandlerService } from 'apps/commudle-admin/src/app/services/stripe-handler.service';

@Component({
  selector: 'commudle-community-payments',
  templateUrl: './community-payments.component.html',
  styleUrls: ['./community-payments.component.scss'],
})
export class CommunityPaymentsComponent implements OnInit {
  isLoading = false;
  constructor(private stripeHandlerService: StripeHandlerService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveStripeAccount();
  }

  connectStripeAccount() {
    const currentUrl = this.router.url;
    this.isLoading = true;
    this.stripeHandlerService.connectStripeAccount(currentUrl).subscribe((data) => {
      this.isLoading = false;
      window.open(data.url, '_blank');
    });
  }

  retrieveStripeAccount() {
    const accountId = 'bf1ea4fe-8f47-43b6-9846-31af0681e0f7';
    this.stripeHandlerService.retrieveStripeAccount(accountId).subscribe((data) => {
      console.log(
        '🚀 ~ file: community-payments.component.ts:27 ~ CommunityPaymentsComponent ~ this.stripeHandlerService.retrieveStripeAccount ~ data:',
        data,
      );
    });
  }
}
