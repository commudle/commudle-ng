import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { faFlask, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { NbSidebarService } from '@nebular/theme';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunities } from 'projects/shared-models/communities.model';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { ICommunityGroups } from 'projects/shared-models/community-groups.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NotificationsStore } from '../../feature-modules/notifications/store/notifications.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  faFlask = faFlask;
  faNewspaper = faNewspaper;
  currentUser: ICurrentUser;
  managedCommunities: ICommunity[] = [];
  managedCommunityGroups: ICommunityGroup[] = [];
  communityOrganizerRoles = [EUserRoles.ORGANIZER, EUserRoles.EVENT_ORGANIZER].map(String);
  isSystemAdmin = false;
  EUserRoles = EUserRoles;
  isPageAdsAdmin = false;
  isBadgesAdmin = false;
  isFeaturedCommunitiesAdmin = false;
  isAssetsAdmin = false;

  notificationCount = 0;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService,
    private communityGroupsService: CommunityGroupsService,
    private sidebarService: NbSidebarService,
    private router: Router,
    private notificationsStore: NotificationsStore,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.closeSidebar();
    this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
      this.managedCommunities = data;
      for (let communities of data) {
        this.updateUnreadNotificationsCount(communities.id);
        this.notificationsStore.getCommunityNotifications(1, 10, communities.id);
        this.notificationsStore.updateCommunityNotifications(communities.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getCurrentUser(): void {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;

      if (currentUser) {
        // check if current user is having a specific role and add corresponding items
        const matchingOrganizerRoles = currentUser.user_roles.filter((value: string) => {
          return -1 !== this.communityOrganizerRoles.indexOf(value);
        });

        if (matchingOrganizerRoles.length > 0) {
          this.getManagingCommunities(matchingOrganizerRoles);
        }

        if (currentUser.user_roles.includes(EUserRoles.SYSTEM_ADMINISTRATOR)) {
          this.isSystemAdmin = true;
        }

        if (currentUser.user_roles.includes(EUserRoles.PAGE_ADS)) {
          this.isPageAdsAdmin = true;
        }

        if (currentUser.user_roles.includes(EUserRoles.BADGES)) {
          this.isBadgesAdmin = true;
        }

        if (currentUser.user_roles.includes(EUserRoles.FEATURED_COMMUNITIES)) {
          this.isFeaturedCommunitiesAdmin = true;
        }

        if (currentUser.user_roles.includes(EUserRoles.STATIC_ASSETS)) {
          this.isAssetsAdmin = true;
        }

        if (currentUser.user_roles.includes(EUserRoles.COMMUNITY_ADMIN)) {
          this.getManagingCommunityGroups();
        }
      }
    });
  }

  getManagingCommunities(userRoles: string[]): void {
    this.managedCommunities = [];
    for (const role of userRoles) {
      this.communitiesService.getRoleCommunities(role).subscribe(() => {});
    }
  }

  getManagingCommunityGroups(): void {
    this.communityGroupsService.getManagingCommunityGroups().subscribe((data: ICommunityGroups) => {
      this.managedCommunityGroups = data.community_groups;
    });
  }

  closeSidebar(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.sidebarService.collapse('mainMenu');
      }
    });
  }

  updateUnreadNotificationsCount(communityId) {
    this.notificationsStore.getCommunityUnreadNotificationsCount(communityId);
  }

  getUnreadNotificationsCount(communityId): number {
    this.subscriptions.push(
      this.notificationsStore.communityNotificationsCount$[communityId].subscribe((count: number) => {
        this.notificationCount = count;
      }),
    );
    return this.notificationCount;
  }
}
