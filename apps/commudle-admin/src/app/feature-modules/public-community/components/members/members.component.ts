import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, OnDestroy {
  community: ICommunity;
  members: IUser[] = [];

  page = 1;
  count = 9;
  canLoadMore = true;

  subscriptions: Subscription[] = [];

  speakers: IUser[] = [];
  isLoadingSpeakers = true;
  isLoadingMembers = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
    private communitySpeakerService: CommunitiesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        if (this.community) {
          this.getMembers();
          this.getSpeakerDetails();
          this.seoService.setTitle(`Members | ${this.community.name}`);
          this.seoService.setTitle(`Speakers | ${this.community.name}`);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getSpeakerDetails(): void {
    this.subscriptions.push(
      this.communitySpeakerService.speakers(this.community.id).subscribe((data) => {
        this.speakers = data.users;
        this.isLoadingSpeakers = false;
      }),
    );
  }

  getMembers(): void {
    if (this.canLoadMore) {
      this.canLoadMore = false;
      this.subscriptions.push(
        this.userRolesUsersService.pGetCommunityMembers(this.community.id, this.page, this.count).subscribe((data) => {
          this.members = [...this.members, ...data.users];
          this.isLoadingMembers = false;
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
