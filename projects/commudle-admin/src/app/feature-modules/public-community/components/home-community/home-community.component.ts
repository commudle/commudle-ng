import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { NotificationChannel } from '../../../notifications/services/websockets/notification.channel';

@Component({
  selector: 'app-home-community',
  templateUrl: './home-community.component.html',
  styleUrls: ['./home-community.component.scss'],
})
export class HomeCommunityComponent implements OnInit, OnDestroy {
  community: ICommunity;
  isOrganizer = false;

  notificationCount = 0;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communitiesService: CommunitiesService,
    private notificationsService: NotificationsService,
    private notificationChannel: NotificationChannel,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      if (this.community.is_visible) {
        this.seoService.setTags(this.community.name, this.community.mini_description, this.community.logo_path);
      } else {
        this.seoService.noIndex(true);
      }
    });
    this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
      if (data.find((cSlug) => cSlug.slug === this.community.slug) !== undefined) {
        this.isOrganizer = true;
        this.getUnreadNotificationsCount(this.community.id);
        this.receiveData();
      }
    });
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  getUnreadNotificationsCount(id) {
    this.notificationsService.getUnreadNotificationsCount(id, 'community').subscribe((count) => {
      this.notificationCount = count;
    });
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              if (data.notification_filter == 'community') {
                this.notificationCount++;
              }
            }
          }
        }
      }),
    );
  }
}
