import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { ListingPagesFilterTypes } from 'apps/shared-models/enums/listing-pages-filter-types';

@Component({
  selector: 'app-labs-search',
  templateUrl: './labs-search.component.html',
  styleUrls: ['./labs-search.component.scss'],
})
export class LabsSearchComponent implements OnInit, OnDestroy {
  labs: IUser[] = [];
  page_info: IPageInfo;
  loading = false;
  loadingSpeakers = false;
  total: number;
  limit = 9;
  skeletonLoaderCard = true;
  queryParamsString = '';
  searchForm;
  query = '';
  isLoadingSearch = false;
  page = 1;
  count = 10;
  totalSearch = 0;
  // listingPagesFilterTypes = ListingPagesFilterTypes;

  constructor(
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private seoService: SeoService,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.seoService.setTags(
    //   'Speakers - Find & Connect With Tech & Design Speakers',
    //   'All the tech speakers from developer communities at one place, from web development, android to ML and AI, find a speaker for your next event or connect with them to learn the latest updates in tech.',
    //   'https://commudle.com/assets/images/commudle-logo192.png',
    // );

    this.search();
    const params = this.activatedRoute.snapshot.queryParams;
    if (Object.keys(params).length > 0) {
      if (params.query) {
        this.query = params.query;
        this.searchForm.get('name').setValue(this.query);
      }
    }
    this.labs = [];
    if (!params.query) {
      this.getSpeakersList();
    }
  }

  search() {
    this.query = '';
    this.searchForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      if (this.isLoadingSearch) {
        return;
      }
      this.labs = [];
      this.page_info = null;
      this.isLoadingSearch = true;
      this.query = this.searchForm.get('name').value;
      this.queryParamsString = this.query;
      this.generateParams(this.query);
    });
  }

  generateParams(query) {
    this.skeletonLoaderCard = true;
    const queryParams: { [key: string]: any } = {};

    if (query) {
      queryParams.query = query;
    }
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    this.location.replaceState(location.pathname, queryParamsString);
    this.getSpeakersList();
  }

  resetFiltersAndSearch() {
    this.searchForm.get('name').setValue('');
    this.query = '';
    this.labs = [];
    this.page_info = null;
  }

  getSpeakersList() {}

  // getSpeakersList() {
  //   this.loading = true;
  //   if (this.loadingSpeakers) {
  //     return;
  //   }
  //   this.loadingSpeakers = true;
  //   if (!this.page_info?.end_cursor) {
  //     this.speakers = [];
  //   }

  //   this.communitiesService
  //     .getSpeakersList(
  //       false,
  //       this.page_info?.end_cursor,
  //       this.limit,
  //       this.query,
  //       this.month,
  //       this.year,
  //       this.employer,
  //       this.employee,
  //     )
  //     .subscribe((data) => {
  //       this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
  //       this.total = data.total;
  //       this.page_info = data.page_info;
  //       this.skeletonLoaderCard = false;
  //       this.loadingSpeakers = false;
  //       this.loading = false;
  //       this.isLoadingSearch = false;
  //     });
  // }
}

// import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
// import { NbMenuItem, NbMenuService } from '@commudle/theme';
// import { LabsService } from 'apps/commudle-admin/src/app/feature-modules/labs/services/labs.service';
// import { ITag } from 'apps/shared-models/tag.model';
// import { ITags } from 'apps/shared-models/tags.model';
// import { Subscription } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-labs-search',
//   templateUrl: './labs-search.component.html',
//   styleUrls: ['./labs-search.component.scss'],
// })
// export class LabsSearchComponent implements OnInit, OnDestroy {
//   labFilters = [];

//   tagSearchParam = '';
//   tagSearchResults: ITag[] = [];
//   showTagSearchResults = false;

//   @Input() labSearchParams: string[] = [];

//   @Output() updateTags: EventEmitter<string[]> = new EventEmitter<string[]>();

//   @ViewChild('searchBar') searchBar: ElementRef<HTMLInputElement>;

//   subscriptions: Subscription[] = [];

//   constructor(private labsService: LabsService, private menuService: NbMenuService) {}

//   ngOnInit(): void {
//     this.setLabFilters();
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
//   }

//   setLabFilters() {
//     const filters = ['Popular Labs', 'New Labs', 'Labs By Experts'];
//     filters.forEach((filter: string) => this.labFilters.push({ title: filter }));

//     this.handleLabFilters();
//   }

//   handleLabFilters() {
//     this.subscriptions.push(
//       this.menuService
//         .onItemClick()
//         .pipe(map(({ item: title }) => title))
//         .subscribe((menuItem: NbMenuItem) => {
//           switch (menuItem.title) {
//             case 'Popular Labs': {
//               break;
//             }
//             case 'New Labs': {
//               break;
//             }
//             case 'Labs By Experts': {
//               break;
//             }
//           }
//         }),
//     );
//   }

//   getTagSearchResults() {
//     if (this.tagSearchParam !== '') {
//       this.labsService
//         .searchTags(this.tagSearchParam.split(' '))
//         .subscribe((value: ITags) => (this.tagSearchResults = value.tags));
//     } else {
//       this.tagSearchResults = [];
//     }
//   }

//   toggleSearchSuffix(value: boolean) {
//     this.showTagSearchResults = value;
//   }

//   onTagAdd(value: string, clearInput: boolean = true) {
//     if (value !== '' && !this.labSearchParams.includes(value)) {
//       this.labSearchParams.push(value);
//       this.updateTags.emit(this.labSearchParams);
//     }
//     if (clearInput) {
//       this.searchBar.nativeElement.value = '';
//       this.tagSearchParam = '';
//       this.tagSearchResults = [];
//     }
//   }

//   onTagDelete(value: string) {
//     // TODO: Not sure how else to stop the div from closing
//     setTimeout(() => (this.showTagSearchResults = true));

//     this.labSearchParams = this.labSearchParams.filter((tag: string) => tag !== value);
//     this.updateTags.emit(this.labSearchParams);
//   }
// }
