import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss'],
})
export class CommunitiesListComponent implements OnInit, OnDestroy {
  communities: ICommunity[] = [];
  skeletonLoaderCard = true;
  query = '';
  showSpinner = false;
  page = 1;
  total: number;
  options = [];
  completed_events_count = false;
  members_count = false;
  subscriptions: Subscription[] = [];
  limit = 0;
  queryParamsString = '';
  searchForm;
  pageInfo: IPageInfo;
  order_by: string;
  isLoading = false;
  canLoadMore = true;
  seoTitle: string;

  constructor(
    private communitiesService: CommunitiesService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private seoService: SeoService,
  ) {
    this.options = ['Most Events', 'Most Members'];
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.limit = window.innerWidth <= 768 ? 3 : 6;
    this.search();
    const params = this.activatedRoute.snapshot.queryParams;
    if (Object.keys(params).length > 0) {
      if (params.members_count) {
        this.members_count = true;
        this.completed_events_count = false;
        this.order_by = 'members_count';
      }
      if (params.completed_events_count) {
        this.members_count = false;
        this.completed_events_count = true;
        this.order_by = 'completed_events_count';
      }
      if (params.query) {
        this.query = params.query;
        this.searchForm.get('name').setValue(this.query);
      }
    }
    this.communities = [];
    this.updateSeoTitle();
    if (!params.query) {
      this.getPopularCommunities();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  updateSeoTitle() {
    this.seoTitle = this.query
      ? `${this.query}-Host & Build Your Own Thriving Dev Community`
      : 'Host & Build Your Own Thriving Dev Community';

    this.seoService.setTags(
      this.seoTitle,
      'Commudle is the best platform for dev communities and forums. Connect with more than 40,000 developers & their communities from diverse backgrounds who constantly share & learn and stay up to date. Sign up now!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  getPopularCommunities(): void {
    this.showSpinner = true;
    this.skeletonLoaderCard = true;
    if (!this.pageInfo?.end_cursor) {
      this.communities = [];
    }
    this.subscriptions.push(
      this.communitiesService
        .getPopularCommunities(this.pageInfo?.end_cursor, this.limit, this.query, this.order_by)
        .subscribe((data) => {
          this.communities = this.communities.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.total = data.total;
          this.pageInfo = data.page_info;
          this.showSpinner = false;
          this.skeletonLoaderCard = false;
        }),
    );
  }

  search() {
    this.query = '';
    this.searchForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      this.communities = [];
      this.query = this.searchForm.get('name').value;
      this.pageInfo = null;
      this.generateParams(this.members_count, this.completed_events_count, this.query);
    });
  }

  filterByTags(event) {
    if (event === this.options[0]) {
      this.completed_events_count = !this.completed_events_count;
      this.members_count = false;
      this.order_by = 'completed_events_count';
    }
    if (event === this.options[1]) {
      this.completed_events_count = false;
      this.members_count = !this.members_count;
      this.order_by = 'members_count';
    }
    if (!this.completed_events_count && !this.members_count) {
      this.order_by = '';
    }
    this.skeletonLoaderCard = true;
    this.communities = [];
    this.pageInfo = null;
    this.generateParams(this.members_count, this.completed_events_count, this.query);
  }

  generateParams(members_count, completed_events_count, query) {
    this.skeletonLoaderCard = true;
    const queryParams: { [key: string]: any } = {};
    if (members_count) {
      queryParams.members_count = true;
    }

    if (completed_events_count) {
      queryParams.completed_events_count = true;
    }

    if (query) {
      queryParams.query = query;
    }
    this.seoTitle = this.query;
    this.updateSeoTitle();
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    this.location.replaceState(location.pathname, queryParamsString);
    this.getPopularCommunities();
  }
}
