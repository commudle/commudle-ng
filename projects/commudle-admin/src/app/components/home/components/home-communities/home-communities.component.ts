import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ICommunity} from 'projects/shared-models/community.model';
import {HomeService} from 'projects/commudle-admin/src/app/services/home.service';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-communities',
  templateUrl: './home-communities.component.html',
  styleUrls: ['./home-communities.component.scss']
})
export class HomeCommunitiesComponent implements OnInit, OnDestroy {

  communities: ICommunity[] = [];
  communityStatus: boolean[] = [];

  subscriptions = []
  currentUser: ICurrentUser;

  @ViewChild('joinCommunityDialog') joinCommunityDialog: TemplateRef<any>;
  joinCommunityRef: NbDialogRef<any>;

  constructor(
    private homeService: HomeService,
    private appUsersService: AppUsersService,
    private authWatchService: LibAuthwatchService,
    private nbDialogService: NbDialogService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCommunities();

    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCommunities(): void {
    this.homeService.communities().subscribe(value => {
      this.communities = value.communities;

      this.getCommunityUserStatus();
    });
  }

  getCommunityUserStatus(): void {
    if (this.currentUser) {
      this.communityStatus = [];
      this.communities.forEach(community => {
        this.appUsersService.getMyRoles('Kommunity', community.id).subscribe(value => {
          // Checking whether the current user has any role in the community
          this.communityStatus.push(value.length !== 0);
        });
      });
    }
  }

  onDialogOpen(community: ICommunity): void {
    this.joinCommunityRef = this.nbDialogService.open(this.joinCommunityDialog, {
      context: {
        community
      }
    });
  }

  onDialogClose(community?: ICommunity): void {
    if (community) {
      this.joinCommunityRef.close();
      this.router.navigate(['communities', community.slug]);
    } else {
      this.joinCommunityRef.close();
    }
  }

}
