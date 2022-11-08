import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { NotificationsStore } from 'projects/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';

@Component({
  selector: 'app-public-community-notifications',
  templateUrl: './public-community-notifications.component.html',
  styleUrls: ['./public-community-notifications.component.scss'],
})
export class PublicCommunityNotificationsComponent implements OnInit, OnDestroy {
  community: ICommunity;

  trackMarkAllAsRead = false;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private nbToastrService: NbToastrService,
    private notificationsStore: NotificationsStore,
  ) {}

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
    this.notificationsService.markAllAsRead('community', this.community.id).subscribe((result) => {
      if (result) {
        this.nbToastrService.success('All notifications marked as read', 'Success');
        this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
        this.notificationsStore.reduceCommunityUnreadNotificationsCount(this.community.id);
      }
    });
  }
}
