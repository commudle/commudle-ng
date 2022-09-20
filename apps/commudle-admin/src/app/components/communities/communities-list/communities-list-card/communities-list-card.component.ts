import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-communities-list-card',
  templateUrl: './communities-list-card.component.html',
  styleUrls: ['./communities-list-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesListCardComponent implements OnInit, OnDestroy {
  @Input() community: ICommunity;

  members: IUser[] = [];
  count = 4;
  page = 1;

  subscription: Subscription;

  constructor(private userRolesUsersService: UserRolesUsersService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMembers(): void {
    this.subscription = this.userRolesUsersService
      .pGetCommunityMembers(this.community.id, this.page, this.count)
      .subscribe((value) => {
        this.members = value.users;
      });
  }
}
