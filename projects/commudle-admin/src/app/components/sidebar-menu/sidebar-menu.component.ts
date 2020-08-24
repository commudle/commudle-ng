import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbWindowService } from '@nebular/theme';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunitiesService } from '../../services/communities.service';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { UserChatComponent } from 'projects/shared-components/user-chat/user-chat.component';
import { UserNotificationsChannel } from 'projects/shared-services/websockets/user-notifications.channel';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  faFlask = faFlask;
  currentUser: ICurrentUser;
  managedCommunities: ICommunity[] = [];
  communityOrganizerRoles = [EUserRoles.ORGANIZER, EUserRoles.EVENT_ORGANIZER].map(String);
  communityAdminRoles = []
  isSystemAdmin = false;

  unreadMessagesCount = 0;

  constructor(
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService,
    private sidebarService: NbSidebarService,
    private windowService: NbWindowService,
    private notificationsChannel: UserNotificationsChannel
  ) { }

  ngOnInit() {
    this.getCurrentUser();

    this.notificationsChannel.newMessagesCounter$.subscribe(value => {
      this.unreadMessagesCount = value.length;
    });
  }

  getCurrentUser() {
    this.authWatchService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
      if (currentUser) {
      // check if current user is having a specific role and add corresponding items
        const matchingOrganizerRoles = currentUser.user_roles.filter(
          (value) => -1 !== this.communityOrganizerRoles.indexOf(value)
        );

        if (matchingOrganizerRoles.length > 0) {
          this.getManagingCommunities(matchingOrganizerRoles);
        }

        if (currentUser.user_roles.includes(EUserRoles.SYSTEM_ADMINISTRATOR)) {
          this.isSystemAdmin = true;
        }
      }
    });
  }


  getManagingCommunities(userRoles) {
    this.managedCommunities = [];
    for (let u of userRoles) {
      this.communitiesService.getRoleCommunities(u).subscribe(data => {
        this.managedCommunities = [...this.managedCommunities, ...data.communities];
      });
    }
  }

  closeSidebar() {
    if (window.screen.width <= 1000) {
      this.sidebarService.collapse();
    }
  }

  openChat() {
    this.windowService.open(UserChatComponent, {title: 'Personal Messages'});
  }


}
