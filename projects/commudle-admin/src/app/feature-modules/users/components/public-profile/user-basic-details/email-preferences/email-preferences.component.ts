import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { EmailUnsubscribeGroupsService } from 'projects/commudle-admin/src/app/feature-modules/email-confirmations/services/email-unsubscribe-groups.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

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
    const entities = _.flatMapDeep(this.subscriptionGroups, (group) =>
      group.filter((entity) => {
        return entity.subscribed === this.subscribeAllStatus;
      }),
    );

    entities.forEach((entity) => {
      this.subscriptions.push(
        this.emailUnsubscribeGroupsService.toggleSubscription(entity.uuid).subscribe((response: boolean) => {
          entity.subscribed = response;
        }),
      );
    });
  }
}
