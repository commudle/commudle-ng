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
  selector: 'app-community-members',
  templateUrl: './community-members.component.html',
  styleUrls: ['./community-members.component.scss'],
})
export class CommunityMembersComponent implements OnInit {
  communtyId;
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

  searchForm = this.fb.group({
    name: [''],
  });

  @ViewChild('removeUserDialog', { static: true }) removeUserDialog: TemplateRef<any>;
  @ViewChild('blockUserDialog', { static: true }) blockUserDialog: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private menuService: NbMenuService,
  ) {}

  ngOnInit() {
    this.communtyId = this.activatedRoute.parent.snapshot.params.community_id;
    this.getMembers();
    this.search();
    this.handleContextMenu();
  }

  getMembers() {
    this.isLoading = true;
    this.userRolesUsersService
      .getCommunityMembers(this.query, this.communtyId, this.count, this.page)
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
          return this.userRolesUsersService.getCommunityMembers(this.query, this.communtyId, this.count, this.page);
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
            this.openDialog(this.removeUserDialog, this.activeContextMenuUser);
            break;
          case 'Block':
            this.openDialog(this.blockUserDialog, this.activeContextMenuUser);
            break;
        }
      });
  }

  removeUser(userId) {
    this.userRolesUsersService.removeUser(userId, this.communtyId).subscribe(() => {
      this.toastrService.success('User removed from community', 'Success');
      this.getMembers();
    });
  }

  blockUser(userId) {
    this.userRolesUsersService.blockUser(userId, this.communtyId).subscribe(() => {
      this.toastrService.success('User blocked from community', 'Success');
      this.getMembers();
    });
  }
}
