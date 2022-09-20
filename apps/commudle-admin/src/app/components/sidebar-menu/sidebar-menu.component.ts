import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { faFlask, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { NbSidebarService } from '@nebular/theme';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunities } from '@commudle/shared-models';
import { ICommunityGroup } from '@commudle/shared-models';
import { ICommunityGroups } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { ICurrentUser } from '@commudle/shared-models';
import { EUserRoles } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
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

  constructor(
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService,
    private communityGroupsService: CommunityGroupsService,
    private sidebarService: NbSidebarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.closeSidebar();
    this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
      this.managedCommunities = data;
    });
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
}
