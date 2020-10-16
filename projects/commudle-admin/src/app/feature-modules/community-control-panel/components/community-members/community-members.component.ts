import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-community-members',
  templateUrl: './community-members.component.html',
  styleUrls: ['./community-members.component.scss']
})
export class CommunityMembersComponent implements OnInit {
  communtyId;
  page = 1;
  count = 25;
  total = 0;
  userRolesUsers: IUserRolesUser[];
  query = '';
  isLoading = false;
  EUserRoles = EUserRoles;

  searchForm = this.fb.group({
    name: ['']
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.communtyId = this.activatedRoute.parent.snapshot.params.community_id;
    this.getMembers();
    this.search();
  }

  getMembers() {
    this.isLoading = true;
    this.userRolesUsersService.getCommunityMembers(this.query, this.communtyId, this.count, this.page).subscribe(data => {
      this.isLoading = false;
      this.userRolesUsers = data.user_roles_users;
      this.page = (+data.page);
      this.total = data.total;
    });
  }

  search() {
    this.searchForm.valueChanges.pipe(
      debounceTime(800),
      switchMap(() => {
        this.page = 1;
        this.isLoading = true;
        this.query = this.searchForm.get('name').value;
        return this.userRolesUsersService.getCommunityMembers(this.query, this.communtyId, this.count, this.page);
      })
    ).subscribe(data => {
      this.isLoading = false;
      this.userRolesUsers = data.user_roles_users;
      this.page = (+data.page);
      this.total = data.total;
    });
  }


  getPageData(page) {
    this.page = page;
    this.getMembers();
  }

}
