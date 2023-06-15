import { Component, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { IPagination } from 'apps/shared-models/pagination.model';

@Component({
  selector: 'commudle-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss'],
})
export class BuildsComponent implements OnInit {
  communityBuilds: ICommunityBuild[] = [];
  timePeriod: string;
  month = false;
  year = false;
  allTime = false;
  order_by: string;

  constructor(private communityBuildsService: CommunityBuildsService) {}

  ngOnInit(): void {
    this.getCommunityBuilds(true);
  }

  filter() {
    if (this.timePeriod === 'month') {
      this.month = true;
      this.year = false;
      this.allTime = false;
      this.order_by = 'votes_count';
    }
    if (this.timePeriod === 'year') {
      this.month = false;
      this.year = true;
      this.allTime = false;
      this.order_by = 'votes_count';
    }
    if (this.timePeriod === 'all-time') {
      this.month = false;
      this.year = false;
      this.allTime = true;
      this.order_by = 'votes_count';
    }
    this.getCommunityBuilds();
  }

  getCommunityBuilds(isAllFilterSelected?) {
    if (isAllFilterSelected) {
      this.month = false;
      this.year = false;
      this.allTime = false;
      this.order_by = '';
    }
    this.communityBuilds = [];
    this.communityBuildsService
      .pGetAll(this.order_by, this.month, this.year, this.allTime)
      .subscribe((data: IPagination<ICommunityBuild>) => {
        this.communityBuilds = this.communityBuilds.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      });
  }
}
