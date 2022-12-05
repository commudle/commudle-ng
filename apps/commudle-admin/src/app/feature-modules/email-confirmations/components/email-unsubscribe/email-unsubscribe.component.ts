import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailUnsubscribeGroupsService } from 'apps/commudle-admin/src/app/feature-modules/email-confirmations/services/email-unsubscribe-groups.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IEmailUnsubscribeGroup } from 'apps/shared-models/email-unsubscribe-group.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-unsubscribe',
  templateUrl: './email-unsubscribe.component.html',
  styleUrls: ['./email-unsubscribe.component.scss'],
})
export class EmailUnsubscribeComponent implements OnInit, OnDestroy {
  uuid;
  loading = false;
  emailUnsubscribeGroup: IEmailUnsubscribeGroup;
  currentUser: ICurrentUser;

  subscriptions: Subscription[] = [];
  environment = environment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailUnsubscribeGroupsService: EmailUnsubscribeGroupsService,
    private seoService: SeoService,
    private toastLogService: LibToastLogService,
    private authwatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle('Email Preferences');
    this.seoService.noIndex(true);

    this.loading = true;
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        if (data.eug) {
          this.uuid = data.eug;
          this.getSubscription();
        }
      }),
    );

    this.subscriptions.push(this.authwatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);

    this.subscriptions.forEach((scubscription: Subscription) => scubscription.unsubscribe());
  }

  getSubscription() {
    this.emailUnsubscribeGroupsService.getSubscription(this.uuid).subscribe((data) => {
      this.emailUnsubscribeGroup = data;
      this.loading = false;
    });
  }

  toggleSubscription() {
    this.loading = true;
    this.emailUnsubscribeGroupsService.toggleSubscription(this.uuid).subscribe((data) => {
      this.emailUnsubscribeGroup.subscribed = data;
      this.loading = false;
      this.toastLogService.successDialog('Updated');
    });
  }
}
