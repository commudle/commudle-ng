import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ICommunity} from 'projects/shared-models/community.model';
import {IUser} from 'projects/shared-models/user.model';
import {UserRolesUsersService} from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-communities-list-card',
  templateUrl: './communities-list-card.component.html',
  styleUrls: ['./communities-list-card.component.scss']
})
export class CommunitiesListCardComponent implements OnInit, OnDestroy {

  @Input() community: ICommunity;

  members: IUser[] = [];
  count = 4;
  page = 1;

  subscription: Subscription;

  constructor(
    private userRolesUsersService: UserRolesUsersService,
  ) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMembers(): void {
    this.subscription = this.userRolesUsersService.pGetCommunityMembers(this.community.id, this.page, this.count).subscribe(value => {
      this.members = value.users;
    })
  }

}
