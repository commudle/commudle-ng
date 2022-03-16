import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbMenuService, NbToastrService } from '@nebular/theme';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUser } from 'projects/shared-models/user.model';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-community-blocked-users',
  templateUrl: './community-blocked-users.component.html',
  styleUrls: ['./community-blocked-users.component.scss'],
})
export class CommunityBlockedUsersComponent implements OnInit {
  communityId;
  page = 1;
  count = 24;
  total = 0;
  userRolesUsers: IUserRolesUser[];
  query = '';
  isLoading = false;
  EUserRoles = EUserRoles;

  contextMenuItems = [
    {
      title: 'Unblock',
    },
  ];
  activeContextMenuUser: IUser;

  searchForm = this.fb.group({
    name: [''],
  });

  @ViewChild('removeUserDialog', { static: true }) removeUserDialog: TemplateRef<any>;
  @ViewChild('unblockUserDialog', { static: true }) unblockUserDialog: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private menuService: NbMenuService,
  ) {}

  ngOnInit() {
    this.communityId = this.activatedRoute.parent.snapshot.params.community_id;
    this.getMembers();
    this.search();
    this.handleContextMenu();
  }

  getMembers() {
    this.isLoading = true;
    this.userRolesUsersService
      .getCommunityBlockedUsers(this.query, this.communityId, this.count, this.page)
      .subscribe((data) => {
        this.isLoading = false;
        this.userRolesUsers = data.user_roles_users;
        this.page = +data.page;
        this.total = data.total;
      });
  }

  search() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(() => {
          this.page = 1;
          this.isLoading = true;
          this.query = this.searchForm.get('name').value;
          return this.userRolesUsersService.getCommunityBlockedUsers(
            this.query,
            this.communityId,
            this.count,
            this.page,
          );
        }),
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.userRolesUsers = data.user_roles_users;
        this.page = +data.page;
        this.total = data.total;
      });
  }

  getPageData(page) {
    this.page = page;
    this.getMembers();
  }

  openDialog(template: TemplateRef<any>, user: IUser) {
    this.dialogService.open(template, { context: { user } });
  }

  handleContextMenu(): void {
    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'community-member-context-menu'),
        map(({ item: title }) => title),
      )
      .subscribe((menuItem) => {
        switch (menuItem.title) {
          case 'Unblock':
            this.openDialog(this.unblockUserDialog, this.activeContextMenuUser);
            break;
        }
      });
  }

  unblockUser(userId) {
    this.userRolesUsersService.unblockUser(userId, this.communityId).subscribe(() => {
      this.toastrService.success('User unblocked from community', 'Success');
      this.getMembers();
    });
  }
}
