import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from 'projects/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { NotificationChannel } from '../../../notifications/services/websockets/notification.channel';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import { NotificationsStore } from '../../../notifications/store/notifications.store';

@Component({
  selector: 'app-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss'],
})
export class CommunityControlPanelComponent implements OnInit, OnDestroy {
  community: ICommunity;

  isOrganizer = false;

  notificationCount = 0;
  faScroll = faScroll;

  subscriptions: Subscription[] = [];

  constructor(
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService,
    private seoService: SeoService,
    private notificationsService: NotificationsService,
    private notificationChannel: NotificationChannel,
    private notificationsStore: NotificationsStore,
  ) {}

  ngOnInit() {
    this.setCommunity();
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setCommunity() {
    this.activatedRoute.params.subscribe(() => {
      let communityId = this.activatedRoute.snapshot.params['community_id'];
      this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
        this.community = data;
        this.seoService.setTitle(`Admin Dashboard | ${this.community.name}`);
        this.checkOrganizer();
      });
    });
  }

  checkOrganizer() {
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        if (data.find((cSlug) => cSlug.slug === this.community.slug) !== undefined) {
          this.isOrganizer = true;
          this.getUnreadNotificationsCount(this.community.id);
          this.receiveData();
        }
      }),
    );
  }

  sendEmails() {
    this.windowService.open(EmailerComponent, {
      title: `Send Email to All ${this.community.member_count} Members`,
      context: {
        community: this.community,
        mailType: EemailTypes.GENERAL_ALL,
      },
    });
  }

  getUnreadNotificationsCount(id) {
    this.subscriptions.push(
      this.notificationsStore.unreadNotificationsCount$.subscribe((data: number) => {
        console.log(data, 'getUnreadNotificationsCount');
        this.notificationCount = data;
      }),
    );
    // this.subscriptions.push(
    //   this.notificationsService.getUnreadNotificationsCount(id, 'community').subscribe((count) => {
    //     this.notificationCount = count;
    //   }),
    // );
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
