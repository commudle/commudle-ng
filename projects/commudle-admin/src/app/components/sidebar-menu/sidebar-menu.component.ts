import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunitiesService } from '../../services/communities.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  currentUser: ICurrentUser;
  managedCommunities: ICommunity[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService,
    private sidebarService: NbSidebarService,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authWatchService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
      if (currentUser) {

        let communityOrganizerRoles = [EUserRoles.ORGANIZER, EUserRoles.EVENT_ORGANIZER].map(String);
      // check if current user is having a specific role and add corresponding items
        let matchingRoles = currentUser.user_roles.filter(
          (value) => -1 !== communityOrganizerRoles.indexOf(value)
        );

        if (matchingRoles.length > 0) {
          this.getManagingCommunities(matchingRoles);
        }
      }
    });
  }


  getManagingCommunities(userRoles) {
    for (let u of userRoles) {
      this.communitiesService.getRoleCommunities(u).subscribe(data => {
        this.managedCommunities = [...this.managedCommunities, ...data.communities];
      });
    }
  }

  closeSidebar() {
    console.log(window.screen.width);
    if (window.screen.width <= 1000) {
      this.sidebarService.collapse();
    }
  }


}
