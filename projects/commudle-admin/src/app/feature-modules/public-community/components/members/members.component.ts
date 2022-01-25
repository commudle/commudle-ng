import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUser } from 'projects/shared-models/user.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, OnDestroy {
  community: ICommunity;
  members: IUser[] = [];

  page = 1;
  count = 24;
  canLoadMore = true;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        if (this.community) {
          this.getMembers();
          this.seoService.setTitle(`Members | ${this.community.name}`);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembers(): void {
    if (this.canLoadMore) {
      this.canLoadMore = false;
      this.subscriptions.push(
        this.userRolesUsersService.pGetCommunityMembers(this.community.id, this.page, this.count).subscribe((data) => {
          this.members = [...this.members, ...data.users];
          if (this.members.length >= data.total) {
            this.canLoadMore = false;
          } else {
            this.page += 1;
            this.canLoadMore = true;
          }
        }),
      );
    }
  }
}
