import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, OnDestroy {
  community: ICommunity;
  members: IUser[] = [];

  page_info: IPageInfo;
  mini = false;
  skeletonLoaderCard = true;
  canLoadMoreSpeakers = false;
  page = 1;
  count = 9;
  canLoadMore = true;
  total;
  query = '';
  month = false;
  year = false;
  employer = false;
  employee = false;

  subscriptions: Subscription[] = [];

  speakers: IUser[] = [];
  isLoadingSpeakers = false;
  isLoadingMembers = false;
  showSpinner = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
    private communitiesService: CommunitiesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        if (this.community) {
          this.getSpeakerDetails();
          this.getMembers();
          this.seoService.setTitle(` Community Members | ${this.community.name}`);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getSpeakerDetails() {
    this.canLoadMoreSpeakers = true;
    if (this.isLoadingSpeakers) {
      return;
    }
    this.isLoadingSpeakers = true;
    if (!this.page_info?.end_cursor) {
      this.speakers = [];
    }

    this.communitiesService
      .getSpeakersList(
        this.mini,
        this.page_info?.end_cursor,
        this.count,
        null,
        this.query,
        this.month,
        this.year,
        this.employer,
        this.employee,
        this.community.id,
      )
      .subscribe((data) => {
        this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.total = data.total;
        this.page_info = data.page_info;
        this.skeletonLoaderCard = false;
        this.isLoadingSpeakers = false;
        this.canLoadMoreSpeakers = false;
      });
  }

  getMembers(): void {
    if (!this.isLoadingMembers && (!this.total || this.members.length < this.total)) {
      this.isLoadingMembers = true;
      this.showSpinner = true;
      this.subscriptions.push(
        this.userRolesUsersService.pGetCommunityMembers(this.community.id, this.page, this.count).subscribe((data) => {
          this.members = [...this.members, ...data.users];
          this.page += 1;
          this.total = data.total;
          this.isLoadingMembers = false;
          if (this.members.length >= this.total) {
            this.canLoadMore = false;
          }
          this.showSpinner = false;
        }),
      );
    }
  }
}
