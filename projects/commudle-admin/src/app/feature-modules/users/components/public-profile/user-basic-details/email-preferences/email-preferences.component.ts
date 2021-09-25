import { Component } from '@angular/core';
import { EmailUnsubscribeGroupsService } from 'projects/commudle-admin/src/app/feature-modules/email-confirmations/services/email-unsubscribe-groups.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss'],
})
export class EmailPreferencesComponent {
  groupTypes: string[];
  subscriptionGroups;
  subscriptions: Subscription[] = [];
  unsubscribeAll: boolean = false;

  constructor(
    private appUsersService: AppUsersService,
    private emailUnsubscribeGroupsService: EmailUnsubscribeGroupsService,
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
        this.groupTypes = Object.keys(response).filter((key) => this.subscriptionGroups[key].length > 0);
        console.log(this.subscriptionGroups);
        //console.log(this.groupTypes)
      }),
    );
  }

  toggleSubscription(uuid) {
    this.subscriptions.push(this.emailUnsubscribeGroupsService.toggleSubscription(uuid).subscribe((response) => {}));
  }

  toggleAllSubscriptions() {
    this.groupTypes.forEach((group) => {
      this.subscriptionGroups[group].forEach((entity) => {
        if (entity.subscribed) {
          this.subscriptions.push(
            this.emailUnsubscribeGroupsService.toggleSubscription(entity.uuid).subscribe((response) => {
              entity.subscribed = response;
            }),
          );
        }
      });
    });
  }
}
