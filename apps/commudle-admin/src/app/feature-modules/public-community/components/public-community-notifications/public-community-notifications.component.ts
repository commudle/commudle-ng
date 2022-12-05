import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';
import { Subscription } from 'rxjs';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';

@Component({
  selector: 'app-public-community-notifications',
  templateUrl: './public-community-notifications.component.html',
  styleUrls: ['./public-community-notifications.component.scss'],
})
export class PublicCommunityNotificationsComponent implements OnInit, OnDestroy {
  community: ICommunity;

  trackMarkAllAsRead = false;

  subscriptions: Subscription[] = [];
  result;

  constructor(private activatedRoute: ActivatedRoute, private notificationsStore: NotificationsStore) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  markAllAsRead() {
    this.result = this.notificationsStore.markAllAsRead(this.community.id);
    if (this.result) {
      this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
    }
  }
}
