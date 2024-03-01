import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@commudle/theme';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { faBuildingColumns, faFileLines, faNewspaper, faMessage } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/commudle-admin/src/app/services/sidebar.service';

@Component({
  selector: 'app-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss'],
})
export class CommunityControlPanelComponent implements OnInit, OnDestroy {
  community: ICommunity;

  isOrganizer = false;

  notificationCount = 0;
  ENotificationSenderTypes = ENotificationSenderTypes;
  faScroll = faScroll;

  subscriptions: Subscription[] = [];
  icons = {
    faBuildingColumns,
    faFileLines,
    faNewspaper,
    faMessage,
  };

  constructor(
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService,
    private seoService: SeoService,
    private notificationsStore: NotificationsStore,
    private gtm: GoogleTagManagerService,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    this.sidebarService.setSidebarVisibility('side', false, true);
    this.setCommunity();
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setCommunity() {
    this.activatedRoute.params.subscribe(() => {
      const communityId = this.activatedRoute.snapshot.params['community_id'];
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
        }
      }),
    );
  }

  sendEmails() {
    this.windowService.open(EmailerComponent, {
      title: `Send Email to All ${this.community.members_count} Members`,
      context: {
        community: this.community,
        mailType: EemailTypes.GENERAL_ALL,
      },
    });
  }

  getUnreadNotificationsCount(communityId) {
    this.subscriptions.push(
      this.notificationsStore.communityNotificationsCount$[communityId].subscribe((count: number) => {
        this.notificationCount = count;
      }),
    );
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification-bell-icon', {
      com_notification_type: this.ENotificationSenderTypes.KOMMUNITY,
    });
  }

  toggleSideBar() {
    this.sidebarService.toggleSidebarVisibility('side', 'https://www.commudle.com/');
  }
}
