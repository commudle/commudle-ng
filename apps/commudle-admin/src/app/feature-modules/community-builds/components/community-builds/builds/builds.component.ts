import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  queryParams = {};

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   this.timePeriod = null;

    //   if (params['month']) {
    //     this.timePeriod = 'month';
    //     this.month = true;
    //     this.year = false;
    //     this.allTime = false;
    //     this.order_by = 'votes_count';
    //   }

    //   if (params['year']) {
    //     this.timePeriod = 'year';
    //     this.month = false;
    //     this.year = true;
    //     this.allTime = false;
    //     this.order_by = 'votes_count';
    //   }

    //   // Check if the 'all-time' query parameter is present
    //   if (params['all-time']) {
    //     this.timePeriod = 'all-time';
    //     this.month = false;
    //     this.year = false;
    //     this.allTime = true;
    //     this.order_by = 'votes_count';
    //   }
    // });

    this.getCommunityBuilds(true);
  }

  filter() {
    if (this.timePeriod === 'month') {
      this.month = true;
      this.year = false;
      this.allTime = false;
      this.order_by = 'votes_count';
      this.queryParams = {
        month: true,
      };
    }
    if (this.timePeriod === 'year') {
      this.month = false;
      this.year = true;
      this.allTime = false;
      this.order_by = 'votes_count';
      this.queryParams = {
        year: true,
      };
    }
    if (this.timePeriod === 'all-time') {
      this.month = false;
      this.year = false;
      this.allTime = true;
      this.order_by = 'votes_count';
      this.queryParams = {
        'all-time': true,
      };
    }
    this.router.navigate([], { queryParams: this.queryParams });
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
