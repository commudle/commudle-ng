import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';

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
  limit = 6;
  queryParamsString = '';
  searchForm;
  pageInfo: IPageInfo;
  order_by: string;

  // isLoading = false;
  // canLoadMore = true;

  constructor(
    private communitiesService: CommunitiesService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.options = ['Most Events', 'Most Members'];
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
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
    if (!params.query) {
      this.getPopularCommunities();
    }
    // this.getPopularCommunities();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getPopularCommunities(): void {
    // console.log(this.query, 'query');
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
          // console.log(this.total, 'total');
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
      // this.getPopularCommunities();
      // if (this.isLoadingSearch) {
      //   return;
      // }
      this.pageInfo = null;
      // this.isLoadingSearch = true;
      // this.queryParamsString = this.query;
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
      console.log('entered');
      this.order_by = '';
    }
    this.skeletonLoaderCard = true;
    this.communities = [];
    // this.getPopularCommunities();
    this.pageInfo = null;
    // this.page = 1;
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
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    this.location.replaceState(location.pathname, queryParamsString);
    this.getPopularCommunities();
  }
}

// changePage(value: number): void {
//   this.page += value;
//   if (this.page > Math.ceil(this.total / this.count)) {
//     this.page = 1;
//   }
//   if (this.page < 1) {
//     this.page = Math.ceil(this.total / this.count);
//   }
//   this.getSearchResults();
// }

// changeTag(value: string): void {
//   this.tag = value === this.tag ? '' : value;
//   this.getSearchResults();
// }

// getSearchTags(): void {
//   this.subscriptions.push(
//     this.communitiesService.getPopularTags().subscribe((value) => {
//       this.searchTags = value;
//     }),
//   );
// }

// getSearchResults(): void {
//   this.subscriptions.push(
//     this.communitiesService.search(this.query, this.tag, this.page, this.count).subscribe((value) => {
//       this.communities = value.communities;
//       this.page = value.page;
//       this.count = value.count;
//       this.total = value.total;
//     }),
//   );
// }

// const params = this.activatedRoute.snapshot.queryParams;
// if (Object.keys(params).length > 0) {
//   if (params.query) {
//     this.query = params.query;
//     this.searchForm.get('name').setValue(this.query);
//   }
// }
// this.speakers = [];
// if (!params.query) {
//   this.getSpeakersList();
// }

// resetFiltersAndSearch() {
//   this.timePeriod = '';
//   this.month = false;
//   this.year = false;
//   this.employment = '';
//   this.employer = false;
//   this.employee = false;
//   this.searchForm.get('name').setValue('');
//   this.query = '';
//   this.speakers = [];
//   this.page_info = null;
// }

// getSearchResults(): void {
//   this.showSpinner = true;
//   this.skeletonLoaderCard = true;
//   // if (!this.page_info?.end_cursor) {
//   //   this.speakers = [];
//   // }
//   this.subscriptions.push(
//     this.communitiesService
//       .search(this.query, this.page, this.limit, this.events, this.members)
//       .subscribe((value) => {
//         this.communities = value.communities;
//         this.page = value.page;
//         this.limit = value.count;
//         this.total = value.total;
//         this.showSpinner = false;
//         this.skeletonLoaderCard = false;
//       }),
//   );
// }
