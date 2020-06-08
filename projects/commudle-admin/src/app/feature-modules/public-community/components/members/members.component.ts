import { Component, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUser } from 'projects/shared-models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  community: ICommunity;
  members: IUser[] = [];

  nextPage = 1;
  count = 50;
  maxPages = 1;
  canLoadMore = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.community = data.community;
      if (this.community) {
        this.getMembers();
      }
    });
  }


  getMembers() {
    if (this.canLoadMore) {
      this.canLoadMore = false;
      this.userRolesUsersService.pGetCommunityMembers(this.community.id, this.nextPage, this.count).subscribe(
        data => {
          this.members = [...this.members, ...data.users];
          if (this.members.length >= data.total) {
            this.canLoadMore = false;
          } else {
            this.nextPage += 1;
            this.canLoadMore = true;
          }
        }
      );
    }
  }

}
