import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { ICommunity, ICurrentUser } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService, LibToastLogService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';

@Component({
  selector: 'commudle-home-communities',
  templateUrl: './home-communities.component.html',
  styleUrls: ['./home-communities.component.scss'],
})
export class HomeCommunitiesComponent implements OnInit, OnDestroy {
  communities: ICommunity[] = [];
  communityStatus: Map<number, boolean>;

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
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.getCommunities();

      this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getCommunities(): void {
    this.homeService.communities().subscribe((value) => {
      this.communities = value.communities;
      this.getCommunityUserStatus();
    });
  }

  getCommunityUserStatus(): void {
    this.communityStatus = new Map<number, boolean>();
    if (this.currentUser) {
      this.communities.forEach((community) => {
        this.appUsersService.getMyRoles('Kommunity', community.id).subscribe((value) => {
          // Checking whether the current user has any role in the community
          this.communityStatus.set(community.id, value.length !== 0);
        });
      });
    }
  }

  openDialog(community: ICommunity, status: boolean) {
    this.nbDialogService.open(status ? this.leaveCommunityDialog : this.joinCommunityDialog, {
      context: {
        community,
      },
    });
  }

  toggleCommunityStatus(community: ICommunity, ref: NbDialogRef<any>) {
    this.userRolesUsersService.pToggleMembership(community.slug).subscribe((data) => {
      if (data) {
        this.toastLogService.successDialog(`You are now a member of ${community.name}!`, 2000);
      }
      // Change community status
      this.communityStatus.set(community.id, data);
      // Close dialog
      ref.close();
    });
  }
}
