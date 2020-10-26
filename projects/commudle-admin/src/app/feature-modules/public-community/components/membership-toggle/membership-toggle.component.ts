import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-membership-toggle',
  templateUrl: './membership-toggle.component.html',
  styleUrls: ['./membership-toggle.component.scss']
})
export class MembershipToggleComponent implements OnInit {
  @Input() community: ICommunity;
  isMember = false;
  dialogRef;
  selectExit;

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.checkMembership();
  }


  checkMembership() {
    this.userRolesUsersService.pCheckMembership(this.community.slug).subscribe(
      data => {
        this.isMember = data;
      }
    );
  }

  toggleMembership() {
    this.userRolesUsersService.pToggleMembership(this.community.slug).subscribe(
      data => {
        this.isMember = data;
        this.dialogRef.close();
      }
    );
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog);
    this.selectExit = null;
  }

}
