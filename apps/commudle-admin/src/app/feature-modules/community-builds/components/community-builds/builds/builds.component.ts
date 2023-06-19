import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
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
  page_info: IPageInfo;
  loading = true;
  total: number;
  isAllFilterSelected = false;
  limit = 5;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        if (params['month']) {
          this.timePeriod = 'month';
          this.month = true;
          this.year = false;
          this.allTime = false;
          this.isAllFilterSelected = false;
          this.order_by = 'votes_count';
        }
        if (params['year']) {
          this.timePeriod = 'year';
          this.month = false;
          this.year = true;
          this.allTime = false;
          this.isAllFilterSelected = false;
          this.order_by = 'votes_count';
        }
        if (params['all-time']) {
          this.timePeriod = 'all-time';
          this.month = false;
          this.year = false;
          this.allTime = true;
          this.isAllFilterSelected = false;
          this.order_by = 'votes_count';
        }
        this.getCommunityBuilds();
      } else {
        this.communityBuilds = [];
        this.isAllFilterSelected = true;
        this.getCommunityBuilds();
      }
    });
  }

  filter() {
    this.isAllFilterSelected = false;
    console.log('month');
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
    this.page_info = null;
    this.communityBuilds = [];
  }

  allFilterSelected() {
    this.isAllFilterSelected = true;
    this.month = false;
    this.year = false;
    this.allTime = false;
    this.order_by = '';
    this.page_info = null;
    this.queryParams = {};
    this.router.navigate([], { queryParams: this.queryParams });
    this.communityBuilds = [];
  }

  getCommunityBuilds() {
    this.loading = true;

    if (!this.page_info?.end_cursor) {
      this.communityBuilds = [];
    }

    this.communityBuildsService
      .pGetAll(this.page_info?.end_cursor, this.limit, this.order_by, this.month, this.year, this.allTime)
      .subscribe((data: IPagination<ICommunityBuild>) => {
        this.communityBuilds = this.communityBuilds.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.total = data.total;
        this.page_info = data.page_info;
        this.loading = false;
      });
  }
}
