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

  ngOnInit(): void {}

  connectStripeAccount() {
    const currentUrl = this.router.url;
    this.isLoading = true;
    this.stripeHandlerService.connectStripeAccount(currentUrl).subscribe((data) => {
      this.isLoading = false;
      window.open(data.url, '_blank');
    });
  }
}
