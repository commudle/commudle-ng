import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@commudle/theme';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'commudle-public-home-list-events-featured-communities-card',
  templateUrl: './public-home-list-events-featured-communities-card.component.html',
  styleUrls: ['./public-home-list-events-featured-communities-card.component.scss'],
})
export class PublicHomeListEventsFeaturedCommunitiesCardComponent implements OnInit {
  @Input() featuredCommunity: IFeaturedCommunity;
  isMember = false;
  joinCommunity = false;
  dialogRef;
  faCheck = faCheck;
  faPlus = faPlus;
  constructor(
    private dialogService: NbDialogService,
    private gtm: GoogleTagManagerService,
    private userRolesUsersService: UserRolesUsersService,
    private toastLogService: LibToastLogService,
  ) {}
  //
  // private authWatchService: LibAuthwatchService,
  //
  ngOnInit(): void {
    console.log(this.featuredCommunity);
  }

  onJoinCommunityClick() {
    this.joinCommunity = true;
    const dialogRef = this.dialogService.open(UserConsentsComponent, {
      context: {
        joinCommunity: this.joinCommunity,
        communitySlug: this.featuredCommunity.kommunity.name,
      },
    });

    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.toggleMembership();
      }
    });
    this.gtmDatalayerPush('join-community-click');
  }

  toggleMembership() {
    this.userRolesUsersService.pToggleMembership(this.featuredCommunity.kommunity.slug).subscribe((data) => {
      this.isMember = data;
      if (this.isMember) {
        this.toastLogService.successDialog(`You are now a member of ${this.featuredCommunity.kommunity.name}!`, 2000);
        this.gtmDatalayerPush('join-community-confirm');
      }
      this.dialogRef.close();
    });
  }

  gtmDatalayerPush(event: string) {
    this.gtm.dataLayerPushEvent(event, {
      // com_user_id: this.currentUser.id,
      com_community_id: this.featuredCommunity.kommunity.id,
    });
  }
}
