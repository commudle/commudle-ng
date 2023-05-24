import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import {
  NbComponentShape,
  NbComponentSize,
  NbDialogService,
  NbComponentStatus,
  NbButtonAppearance,
} from '@commudle/theme';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';

@Component({
  selector: 'app-membership-toggle',
  templateUrl: './membership-toggle.component.html',
  styleUrls: ['./membership-toggle.component.scss'],
})
export class MembershipToggleComponent implements OnInit {
  isMember = false;
  dialogRef;
  selectExit;
  currentUser: ICurrentUser;

  @Input() community: ICommunity;
  @Input() shapes: NbComponentShape = 'rectangle';
  @Input() status: NbComponentStatus = 'basic';
  @Input() size: NbComponentSize = 'small';
  @Input() appearance: NbButtonAppearance = 'filled';

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;
    });
    this.checkMembership();
  }

  checkMembership() {
    this.userRolesUsersService.pCheckMembership(this.community.slug).subscribe((data) => (this.isMember = data));
  }

  toggleMembership() {
    this.userRolesUsersService.pToggleMembership(this.community.slug).subscribe((data) => {
      this.isMember = data;
      if (this.isMember) {
        this.toastLogService.successDialog(`You are now a member of ${this.community.name}!`, 2000);
        this.gtmDatalayerPush('join-community-confirm');
      }
      this.dialogRef.close();
    });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, { autoFocus: false });
    this.selectExit = null;
    this.gtmDatalayerPush('join-community-click');
  }

  onJoinCommunityClick() {
    const dialogRef = this.dialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.joinCommunity,
        communitySlug: this.community.name,
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

  gtmDatalayerPush(event: string) {
    this.gtm.dataLayerPushEvent(event, {
      com_user_id: this.currentUser.id,
      com_community_id: this.community.id,
    });
  }
}
