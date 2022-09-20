import {UserRolesUsersService} from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ICommunity} from '@commudle/shared-models';
import {NbDialogService} from '@nebular/theme';
import {LibToastLogService} from '@commudle/shared-services';

@Component({
  selector: 'commudle-membership-toggle',
  templateUrl: './membership-toggle.component.html',
  styleUrls: ['./membership-toggle.component.scss']
})
export class MembershipToggleComponent implements OnInit {

  isMember = false;
  dialogRef;
  selectExit;

  @Input() community: ICommunity;

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService
  ) {
  }

  ngOnInit() {
    this.checkMembership();
  }

  checkMembership() {
    this.userRolesUsersService.pCheckMembership(this.community.slug).subscribe(data => this.isMember = data);
  }

  toggleMembership() {
    this.userRolesUsersService.pToggleMembership(this.community.slug).subscribe(data => {
      this.isMember = data;
      if (this.isMember) {
        this.toastLogService.successDialog(`You are now a member of ${this.community.name}!`, 2000);
      }
      this.dialogRef.close();
    });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {autoFocus: false});
    this.selectExit = null;
  }

}
