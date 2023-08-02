import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeHandlerService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-payments',
  templateUrl: './community-payments.component.html',
  styleUrls: ['./community-payments.component.scss'],
})
export class CommunityPaymentsComponent implements OnInit {
  isLoading = false;
  communityId: number;
  ac: string;
  stripeAccounts = [];
  subscription: Subscription[] = [];
  isUpdating = false;
  constructor(
    private stripeHandlerService: StripeHandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
    this.getStripeAccounts();
    this.ac = this.activatedRoute.snapshot.queryParamMap.get('ac');
    if (this.ac) {
      this.retrieveStripeAccount(this.ac);
    }
  }

  connectStripeAccount() {
    const currentUrl = this.router.url;
    this.isLoading = true;
    this.subscription.push(
      this.stripeHandlerService.connectStripeAccount(currentUrl, this.communityId).subscribe((data) => {
        this.isLoading = false;
        window.open(data.url, '_blank');
      }),
    );
  }

  getStripeAccounts() {
    this.subscription.push(
      this.stripeHandlerService.indexStripeAccount(this.communityId).subscribe((data) => {
        this.stripeAccounts = this.stripeAccounts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      }),
    );
  }

  retrieveStripeAccount(uuid) {
    this.isUpdating = true;
    this.subscription.push(
      this.stripeHandlerService.retrieveStripeAccount(uuid).subscribe((data) => {
        for (let i = 0; i < this.stripeAccounts.length; i++) {
          if (this.stripeAccounts[i].uuid === this.ac) {
            this.stripeAccounts[i].active = true;
            this.stripeAccounts[i].details = data;
            break;
          }
        }
        this.isUpdating = false;
      }),
    );
  }
}
