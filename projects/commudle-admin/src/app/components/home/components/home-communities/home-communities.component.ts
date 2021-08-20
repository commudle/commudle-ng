import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { HomeService } from 'projects/commudle-admin/src/app/services/home.service';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-home-communities',
  templateUrl: './home-communities.component.html',
  styleUrls: ['./home-communities.component.scss']
})
export class HomeCommunitiesComponent implements OnInit, OnDestroy {

  communities: ICommunity[] = [];
  communityStatus: Map<Number,boolean>;

  subscriptions = [];
  currentUser: ICurrentUser;

  @ViewChild('joinCommunityDialog') joinCommunityDialog: TemplateRef<any>;
  @ViewChild('leaveCommunityDialog') leaveCommunityDialog: TemplateRef<any>;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private homeService: HomeService,
    private appUsersService: AppUsersService,
    private authWatchService: LibAuthwatchService,
    private userRolesUsersService: UserRolesUsersService,
    private toastLogService: LibToastLogService,
    private nbDialogService: NbDialogService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngOnInit(): void {

    if (this.isBrowser) {
      this.getCommunities();

      this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCommunities(): void {
    this.homeService.communities().subscribe(value => {
      console.log(value)
      this.communities = value.communities;
      this.getCommunityUserStatus();
    });
    
  }

  getCommunityUserStatus(): void {
    if (this.currentUser) {
      this.communityStatus = new Map<Number,boolean>();
      this.communities.forEach(community => {
        this.appUsersService.getMyRoles('Kommunity', community.id).subscribe(value => {
          // Checking whether the current user has any role in the community
          this.communityStatus.set( community.id ,value.length !== 0);
        });
      });
      console.log(this.communityStatus)
    }
  }

  openDialog(community: ICommunity, status: boolean) {
    
    this.nbDialogService.open(status ? this.leaveCommunityDialog : this.joinCommunityDialog, {
      context: {
        community
      }
    });
  }

  toggleCommunityStatus(community: ICommunity, ref: NbDialogRef<any>) {
    console.log(community)
    this.userRolesUsersService.pToggleMembership(community.slug).subscribe(data => {
      console.log(data)
      if (data) {
        this.toastLogService.successDialog(`You are now a member of ${community.name}!`, 2000);
      }
      // Change community status
      this.communityStatus.set(community.id, data);
      // const idx = this.communities.findIndex(value => community.id === value.id);
      // this.communityStatus[idx] = data;
      // Close dialog
      ref.close();
    });
  }

}
