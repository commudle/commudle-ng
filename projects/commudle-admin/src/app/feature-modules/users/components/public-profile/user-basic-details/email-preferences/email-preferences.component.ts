import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EmailUnsubscribeGroupsService } from 'projects/commudle-admin/src/app/feature-modules/email-confirmations/services/email-unsubscribe-groups.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss'],
})
export class EmailPreferencesComponent implements OnInit, OnDestroy {
  subscriptionGroups: any;
  subscriptions: Subscription[] = [];
  subscribeAllStatus: boolean;

  constructor(
    private appUsersService: AppUsersService,
    private emailUnsubscribeGroupsService: EmailUnsubscribeGroupsService,
    private cdr: ChangeDetectorRef,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.getAllUserSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getAllUserSubscriptions() {
    this.subscriptions.push(
      this.appUsersService.getUserEmailSubscriptions().subscribe((response) => {
        this.subscriptionGroups = response;
        this.checkAllSubscriptions();
      }),
    );
  }

  toggleSubscription(entity) {
    this.subscriptions.push(
      this.emailUnsubscribeGroupsService.toggleSubscription(entity.uuid).subscribe((response: boolean) => {
        response
          ? this.toastLogService.successDialog('Subscribed Successfully')
          : this.toastLogService.successDialog('Unsubscribed Successfully');
        entity.subscribed = response;
        this.checkAllSubscriptions();
        this.cdr.detectChanges();
      }),
    );
  }

  checkAllSubscriptions() {
    this.subscribeAllStatus = _.some(this.subscriptionGroups, (group) => _.some(group, (entity) => entity.subscribed));
  }

  toggleAllSubscriptions() {
    let entities = [];

    for (let property in this.subscriptionGroups) {
      entities = entities.concat(
        this.subscriptionGroups[property].filter((entity) => entity.subscribed === this.subscribeAllStatus),
      );
    }

    for (let entity of entities) {
      this.subscriptions.push(
        this.emailUnsubscribeGroupsService.toggleSubscription(entity.uuid).subscribe((response: boolean) => {
          entity.subscribed = response;
        }),
      );
    }
  }
}
