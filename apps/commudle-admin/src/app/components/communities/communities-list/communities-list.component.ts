import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  events = false;
  members = false;
  subscriptions: Subscription[] = [];
  limit = 6;
  queryParamsString = '';
  searchForm;

  // tag = '';
  // searchTags: string[] = [];
  // isLoading = false;
  // canLoadMore = true;
  // page_info: IPageInfo;
  // count = 6;
  // searchField: FormControl = new FormControl();
  // totalSearch = 0;
  // listingPagesFilterTypes = ListingPagesFilterTypes;

  constructor(private communitiesService: CommunitiesService, private fb: FormBuilder) {
    // private activatedRoute: ActivatedRoute, private location: Location,
    this.options = ['Most Events', 'Most Members'];
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.search();
    // this.getSearchTags();
    this.getSearchResults();
    this.communities = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getSearchResults(): void {
    this.showSpinner = true;
    this.skeletonLoaderCard = true;
    // if (!this.page_info?.end_cursor) {
    //   this.speakers = [];
    // }
    this.subscriptions.push(
      this.communitiesService
        .search(this.query, this.page, this.limit, this.events, this.members)
        .subscribe((value) => {
          this.communities = value.communities;
          this.page = value.page;
          this.limit = value.count;
          this.total = value.total;
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
      this.getSearchResults();
      // if (this.isLoadingSearch) {
      //   return;
      // }
      // this.page_info = null;
      // this.isLoadingSearch = true;
      // this.queryParamsString = this.query;
      // this.generateParams(this.month, this.year, this.employee, this.employer, this.query);
    });
  }

  filterByTags(event) {
    if (event === this.options[0]) {
      this.events = !this.events;
      this.members = false;
    }
    if (event === this.options[1]) {
      this.events = false;
      this.members = !this.members;
    }
    this.skeletonLoaderCard = true;
    this.communities = [];
    this.getSearchResults();
    // this.page_info = null;
    // this.page = 1;
    // this.generateParams(this.month, this.year, this.employee, this.employer, this.query);
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

// generateParams(monthly, yearly, query) {
//   this.skeletonLoaderCard = true;
//   const queryParams: { [key: string]: any } = {};
//   if (monthly) {
//     queryParams.monthly = true;
//   }

//   if (yearly) {
//     queryParams.yearly = true;
//   }

//   if (query) {
//     queryParams.query = query;
//   }
//   const urlSearchParams = new URLSearchParams(queryParams);
//   const queryParamsString = urlSearchParams.toString();
//   this.location.replaceState(location.pathname, queryParamsString);
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
