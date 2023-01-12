import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbMenuService, NbToastrService } from '@commudle/theme';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IUser } from 'apps/shared-models/user.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-community-members',
  templateUrl: './community-members.component.html',
  styleUrls: ['./community-members.component.scss'],
})
export class CommunityMembersComponent implements OnInit {
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
      title: 'Remove',
    },
    {
      title: 'Remove & Block',
    },
  ];
  activeContextMenuUser: IUser;

  searchForm;

  selectedUserRoles: IUserRolesUser[] = [];
  removeUserForm;

  @ViewChild('removeUserDialog', { static: true }) removeUserDialog: TemplateRef<any>;
  @ViewChild('blockUserDialog', { static: true }) blockUserDialog: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private menuService: NbMenuService,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
    this.removeUserForm = this.fb.group({
      user_roles_user_ids: this.fb.array([]),
    });
  }

  get userRolesUserIds(): FormArray {
    return this.removeUserForm.get('user_roles_user_ids') as FormArray;
  }

  ngOnInit() {
    this.communityId = this.activatedRoute.parent.parent.snapshot.params.community_id;
    this.getMembers();
    this.search();
    this.handleContextMenu();
  }

  getMembers() {
    this.isLoading = true;
    this.userRolesUsersService
      .getCommunityMembers(this.query, this.communityId, this.count, this.page)
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
          return this.userRolesUsersService.getCommunityMembers(this.query, this.communityId, this.count, this.page);
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
          case 'Remove':
            this.getUserRoles(this.activeContextMenuUser.id, this.communityId);
            this.openDialog(this.removeUserDialog, this.activeContextMenuUser);
            break;
          case 'Remove & Block':
            this.openDialog(this.blockUserDialog, this.activeContextMenuUser);
            break;
        }
      });
  }

  removeUser() {
    this.userRolesUsersService.removeUser(this.removeUserForm.value, this.communityId).subscribe(() => {
      this.toastrService.success('User removed from community', 'Success');
      this.getMembers();
    });
  }

  getUserRoles(userId, communityId) {
    this.userRolesUsersService.getRoles(userId, communityId).subscribe((value) => {
      this.selectedUserRoles = value.user_roles_users;
      this.selectedUserRoles.forEach((userRole) => {
        this.userRolesUserIds.push(this.fb.control(userRole.id));
      });
    });
  }

  toggleUserRole(userRoleId) {
    const index = this.userRolesUserIds.controls.findIndex((control) => control.value === userRoleId);
    if (index !== -1) {
      this.userRolesUserIds.removeAt(index);
    } else {
      this.userRolesUserIds.push(this.fb.control(userRoleId));
    }
  }

  blockUser(userId) {
    this.userRolesUsersService.blockUser(userId, this.communityId).subscribe(() => {
      this.toastrService.success('User blocked from community', 'Success');
      this.getMembers();
    });
  }
}
