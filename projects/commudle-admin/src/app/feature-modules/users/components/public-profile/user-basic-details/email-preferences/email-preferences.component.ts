import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EmailUnsubscribeGroupsService } from 'projects/commudle-admin/src/app/feature-modules/email-confirmations/services/email-unsubscribe-groups.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss'],
})
export class EmailPreferencesComponent implements OnInit, OnDestroy {
  subscriptionGroups: Object;
  subscriptions: Subscription[] = [];
  subscribeAll: boolean;

  constructor(
    private appUsersService: AppUsersService,
    private emailUnsubscribeGroupsService: EmailUnsubscribeGroupsService,
    private cdr: ChangeDetectorRef,
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
        //delete this.subscriptionGroups['labs'];
        this.checkAllSubscriptions();
      }),
    );
  }

  toggleSubscription(entity) {
    this.subscriptions.push(
      this.emailUnsubscribeGroupsService.toggleSubscription(entity.uuid).subscribe((response: boolean) => {
        entity.subscribed = response;
        this.checkAllSubscriptions();
        this.cdr.detectChanges();
      }),
    );
  }

  checkAllSubscriptions() {
    let status: boolean = false;
    Object.keys(this.subscriptionGroups).forEach((group: string) => {
      this.subscriptionGroups[group].forEach((entity) => {
        if (entity.subscribed) {
          status = true;
        }
      });
    });
    this.subscribeAll = status;
  }

  toggleAllSubscriptions() {
    Object.keys(this.subscriptionGroups).forEach((group: string) => {
      this.subscriptionGroups[group].forEach((entity) => {
        if (entity.subscribed == this.subscribeAll) {
          this.subscriptions.push(
            this.emailUnsubscribeGroupsService.toggleSubscription(entity.uuid).subscribe((response: boolean) => {
              entity.subscribed = response;
            }),
          );
        }
      });
    });
  }
}
