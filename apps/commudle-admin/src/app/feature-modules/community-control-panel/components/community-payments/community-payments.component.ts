import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeHandlerService, countries_details } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-payments',
  templateUrl: './community-payments.component.html',
  styleUrls: ['./community-payments.component.scss'],
})
export class CommunityPaymentsComponent implements OnInit, OnDestroy {
  isLoading = false;
  communityId: number;
  ac: string;
  stripeAccounts = [];
  subscriptions: Subscription[] = [];
  isUpdating = false;
  stripeConnectAccountForm;
  dialogRef: NbDialogRef<any>;
  countries = countries_details;

  constructor(
    private stripeHandlerService: StripeHandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
  ) {
    this.stripeConnectAccountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone_country_code: [91, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      zip_code: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      country: ['India', Validators.required],
    });
  }

  ngOnInit(): void {
    this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
    this.getStripeAccounts();
    this.ac = this.activatedRoute.snapshot.queryParamMap.get('ac');
    if (this.ac) {
      this.retrieveStripeAccount(this.ac);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.dialogRef?.close();
  }

  openDialogBox(StripeConnectAccount: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(StripeConnectAccount);
  }

  connectStripeAccount() {
    const currentUrl = this.router.url;
    this.isLoading = true;
    this.subscriptions.push(
      this.stripeHandlerService
        .connectStripeAccount(this.stripeConnectAccountForm, currentUrl, this.communityId)
        .subscribe((data) => {
          this.isLoading = false;
          this.stripeConnectAccountForm.reset();
          this.dialogRef.close();
          window.open(data.url);
        }),
    );
  }

  getStripeAccounts() {
    this.subscriptions.push(
      this.stripeHandlerService.indexStripeAccount(this.communityId).subscribe((data) => {
        this.stripeAccounts = this.stripeAccounts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      }),
    );
  }

  retrieveStripeAccount(uuid) {
    this.isUpdating = true;
    this.subscriptions.push(
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

  updateStripeAccount(uuid) {
    const currentUrl = this.router.url;
    this.subscriptions.push(this.stripeHandlerService.linkAccount(uuid, currentUrl).subscribe((data) => {}));
  }
}
