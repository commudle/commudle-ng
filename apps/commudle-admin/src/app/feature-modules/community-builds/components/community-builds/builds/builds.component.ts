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
  loading = false;
  total: number;
  isAllFilterSelected = false;
  limit = 5;
  skeletonLoaderCard = true;

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
        this.communityBuilds = [];
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
    this.communityBuilds = [];
    this.page_info = null;
    this.router.navigate([], { queryParams: this.queryParams });
  }

  allFilterSelected() {
    this.isAllFilterSelected = true;
    this.month = false;
    this.year = false;
    this.allTime = false;
    this.order_by = '';
    this.timePeriod = null;
    this.communityBuilds = [];
    this.queryParams = {};
    this.page_info = null;
    this.router.navigate([], { queryParams: this.queryParams });
  }

  getCommunityBuilds() {
    this.loading = true;
    if (!this.page_info?.end_cursor) {
      this.communityBuilds = [];
    }

    this.communityBuildsService
      .pGetAll(this.page_info?.end_cursor, this.limit, this.order_by, this.month, this.year, this.allTime)
      .subscribe((data: IPagination<ICommunityBuild>) => {
        const newData = data.page.reduce((acc, value) => [...acc, value.data], []);
        const uniqueData = newData.filter(
          (item) => !this.communityBuilds.some((existingItem) => existingItem.id === item.id),
        );
        this.communityBuilds = this.communityBuilds.concat(uniqueData);
        this.total = data.total;
        this.page_info = data.page_info;
        this.skeletonLoaderCard = false;
        this.loading = false;
      });
  }
}
