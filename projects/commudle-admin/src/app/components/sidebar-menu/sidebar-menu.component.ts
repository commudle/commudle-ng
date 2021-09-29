import { Component, OnInit } from '@angular/core';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { NbSidebarService } from '@nebular/theme';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { CommunitiesService } from '../../services/communities.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  faFlask = faFlask;
  currentUser: ICurrentUser;
  managedCommunities: ICommunity[] = [];
  managedCommunityGroups: ICommunityGroup[] = [];
  communityOrganizerRoles = [EUserRoles.ORGANIZER, EUserRoles.EVENT_ORGANIZER].map(String);
  isSystemAdmin = false;
  EUserRoles = EUserRoles;
  isPageAdsAdmin = false;
  isBadgesAdmin = false;
  isFeaturedCommunitiesAdmin = false;

  constructor(
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService,
    private communityGroupsService: CommunityGroupsService,
    private sidebarService: NbSidebarService,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      if (currentUser) {
        // check if current user is having a specific role and add corresponding items
        const matchingOrganizerRoles = currentUser.user_roles.filter(
          (value) => -1 !== this.communityOrganizerRoles.indexOf(value),
        );

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

        if (currentUser.user_roles.includes(EUserRoles.COMMUNITY_ADMIN)) {
          this.getManagingCommunityGroups();
        }
      }
    });
  }

  getManagingCommunities(userRoles: string[]): void {
    this.managedCommunities = [];
    for (const role of userRoles) {
      this.communitiesService.getRoleCommunities(role).subscribe((data) => {
        this.managedCommunities = [...this.managedCommunities, ...data.communities];
      });
    }
  }

  getManagingCommunityGroups(): void {
    this.communityGroupsService.getManagingCommunityGroups().subscribe((data) => {
      this.managedCommunityGroups = data.community_groups;
    });
  }

  closeSidebar(): void {
    if (window.screen.width <= 1000) {
      this.sidebarService.collapse();
    }
  }
}
