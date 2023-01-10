import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { NbDialogService } from '@commudle/theme';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';

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

  gtmDatalayerPush(event: string) {
    this.gtm.dataLayerPushEvent(event, {
      com_user_id: this.currentUser.id,
      com_community_id: this.community.id,
    });
  }
}
