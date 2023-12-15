// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import {
//   getPicture,
//   getTitle,
//   navigate,
// } from 'apps/commudle-admin/src/app/feature-modules/search/components/utils/search.utils';
// import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
// import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
// import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
// import { ISearch } from 'apps/shared-models/search.model';
// import { SeoService } from 'apps/shared-services/seo.service';

// @Component({
//   selector: 'app-search-page',
//   templateUrl: './search-page.component.html',
//   styleUrls: ['./search-page.component.scss'],
// })
// export class SearchPageComponent implements OnInit, OnDestroy {
//   results = [];
//   page = 1;
//   count = 15;
//   total = -1;
//   query: string;

//   selectedFilters = [];

//   searchLoader = false;
//   loadMoreLoader = false;
//   // showSpinner = true;

//   getPicture = getPicture;
//   getTitle = getTitle;
//   navigate = navigate;

//   constructor(
//     private searchService: SearchService,
//     private seoService: SeoService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router,
//     private searchStatusService: SearchStatusService,
//     private gtm: GoogleTagManagerService,
//   ) {}

//   ngOnInit(): void {
//     this.seoService.noIndex(true);
//     this.searchStatusService.setSearchStatus(false);

//     this.getData();
//   }

//   ngOnDestroy(): void {
//     this.seoService.noIndex(false);
//     this.searchStatusService.setSearchStatus(true);
//   }

//   getData() {
//     this.activatedRoute.queryParams.subscribe((params: Params) => {
//       this.searchLoader = true;

//       this.results = [];
//       this.total = -1;
//       this.page = 1;
//       this.filters = [];
//       this.selectedFilters = [];

//       this.query = params.q;
//       this.getSearchData();
//     });
//   }

//   getSearchData() {
//     this.loadMoreLoader = true;
//     this.searchService.getSearchResults(this.query, this.page, this.count).subscribe((value: ISearch) => {
//       this.seoService.setTitle(`Search results for "${this.query}"`);
//       this.results = [...this.results, ...value.results];
//       this.total = value.total;
//       this.page++;
//       this.filters = [
//         ...new Set(
//           this.results.map((result) => {
//             if (result) {
//               return result.type;
//             }
//           }),
//         ),
//       ];

//       this.searchLoader = false;
//       this.loadMoreLoader = false;
//       this.gtmService(this.query);
//     });
//   }

//   onFilterChange(filter: string) {
//     if (this.selectedFilters.includes(filter)) {
//       this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
//     } else {
//       this.selectedFilters.push(filter);
//     }
//   }

//   getResults() {
//     const filters = this.selectedFilters.length ? this.selectedFilters : this.filters;
//     return this.results.filter((result) => {
//       if (result) {
//         return filters.includes(result.type);
//       }
//     });
//   }

//   // getUsers() {
//   //   const filters = this.selectedFilters.length ? this.selectedFilters : this.filters;
//   //   return this.results.filter((result) => {
//   //     result.type === 'User';
//   //     // if (result) {
//   //     //   return filters.includes(result.type);
//   //     // }
//   //   });
//   // }
//   // getCommunity() {
//   //   const filters = this.selectedFilters.length ? this.selectedFilters : this.filters;
//   //   return this.results.filter((result) => {
//   //     result.type === 'Community Build';
//   //     // if (result) {
//   //     //   return filters.includes(result.type);
//   //     // }
//   //   });
//   // }

//   gtmService(query) {
//     this.gtm.dataLayerPushEvent('search_query', { query });
//   }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IUser } from '@commudle/shared-models';
import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ISearch } from 'apps/shared-models/search.model';
import { SeoService } from 'apps/shared-services/seo.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  page = 1;
  count = 15;
  total = 0;
  query: string;
  results = [];
  filters = [];
  selectedFilters = ['All'];

  users: any[] = [];
  communities = [];
  labs = [];
  builds = [];
  events = [];
  content = [];
  blogs = [];
  newsletters = [];

  searchLoader = true;

  constructor(
    private searchService: SearchService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchStatusService: SearchStatusService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
    this.searchStatusService.setSearchStatus(false);
    // this.getAllData();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchLoader = true;
      this.query = params.q;
      this.page = 1;
      this.filters = [];
      this.selectedFilters = ['All'];
      this.results = [];
      this.total = 0;
      this.searchQuery();
      this.getAllData();
    });

    // this.searchService.getSearchResults(this.query, this.page, this.count).subscribe((value: ISearch) => {
    //   this.seoService.setTitle(`Search results for "${this.query}"`);
    //   this.results = [...this.results, ...value.results];
    //   this.total = value.total;
    //   this.filters = [
    //     ...new Set(
    //       this.results.map((result) => {
    //         if (result) {
    //           return result.type;
    //         }
    //       }),
    //     ),
    //   ];
    // });
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.searchStatusService.setSearchStatus(true);
  }

  searchQuery() {
    this.searchService.getSearchResults(this.query, this.page, this.count).subscribe((value: ISearch) => {
      // this.searchLoader = true;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      const filteredResults = value.results.filter(
        (result) => result && result.type !== null && result.type !== undefined,
      );
      this.results = [...this.results, ...filteredResults];
      this.total = value.total;
      // this.page++;
      this.filters = [
        ...new Set(
          this.results.map((result) => {
            if (result && result.type !== null && result.type !== undefined) {
              return result.type;
            }
          }),
        ),
      ];
      // this.searchLoader = false;
      // this.loadMoreLoader = false;
      // this.gtmService(this.query);
    });
  }

  // getSearchData() {
  //   // this.loadMoreLoader = true;
  //   this.searchService.getSearchResults(this.query, this.page, this.count).subscribe((value: ISearch) => {
  //     this.seoService.setTitle(`Search results for "${this.query}"`);
  //     this.results = [...this.results, ...value.results];
  //     this.total = value.total;
  //     this.page++;
  //     this.filters = [
  //       ...new Set(
  //         this.results.map((result) => {
  //           if (result) {
  //             return result.type;
  //           }
  //         }),
  //       ),
  //     ];

  //     this.searchLoader = false;
  //     this.loadMoreLoader = false;
  //     this.gtmService(this.query);
  //   });
  // }

  getUsers() {
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count, 'User').subscribe((value: any) => {
      this.users = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.page++;
      this.gtmService(this.query);
      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getCommunity() {
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Kommunity').subscribe((value: any) => {
      this.communities = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.page++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getLabs() {
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Lab').subscribe((value: any) => {
      this.labs = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.page++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getBuilds() {
    console.log('builds called');
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Build').subscribe((value: any) => {
      this.builds = value.results;
      console.log(value);
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.page++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getEvents() {
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Event').subscribe((value: any) => {
      this.events = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.page++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }
  getContent() {
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Content').subscribe((value: any) => {
      this.content = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.page++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }
  // getNewsletter() {
  //   this.searchService.getSearchResults(this.query, this.page, this.count, 'Newsletter').subscribe((value: any) => {
  //     this.newsletters = value.results;
  //     this.seoService.setTitle(`Search results for "${this.query}"`);
  //     // this.results = [...this.results, ...value.results];
  //     this.total += value.total;
  //     this.page++;
  //     this.gtmService(this.query);

  //     // this.searchLoader = false;
  //     // this.loadMoreLoader = false;
  //   });
  // }

  onFilterChange(filter: string) {
    this.searchLoader = true;
    this.total = 0;
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters.push(filter);

      // this.getUsers();
      // this.getCommunity();
      // this.getLabs();
    }
    this.getAllData();
  }

  gtmService(query) {
    this.gtm.dataLayerPushEvent('search_query', { query });
  }

  // getAllData() {
  //   if (this.selectedFilters.includes('User') || this.selectedFilters.includes('All')) {
  //     this.getUsers();
  //   }
  //   if (this.selectedFilters.includes('Community') || this.selectedFilters.includes('All')) {
  //     this.getCommunity();
  //   }
  //   if (this.selectedFilters.includes('Lab ') || this.selectedFilters.includes('All')) {
  //     this.getLabs();
  //   }
  //   if (this.selectedFilters.includes('Community Build') || this.selectedFilters.includes('All')) {
  //     this.getBuilds();
  //   }
  //   if (this.selectedFilters.includes('Event') || this.selectedFilters.includes('All')) {
  //     this.getEvents();
  //   }
  //   if (this.selectedFilters.includes('Content') || this.selectedFilters.includes('All')) {
  //     this.getContent();
  //   }
  //   if (this.selectedFilters.includes('Newsletter') || this.selectedFilters.includes('All')) {
  //     this.getNewsletter();
  //   }
  //   // this.getBlogs();
  // }

  getAllData() {
    this.searchLoader = true;
    if (this.selectedFilters.includes('All')) {
      this.getUsers();
      this.getCommunity();
      this.getLabs();
      this.getBuilds();
      this.getEvents();
      this.getContent();
      // this.searchLoader = false;
      // this.getNewsletter();
    } else {
      this.selectedFilters.forEach((filter) => {
        switch (filter) {
          case 'User':
            this.getUsers();
            break;
          case 'Community':
            this.getCommunity();
            break;
          case 'Lab ':
            this.getLabs();
            break;
          case 'Community Build':
            this.getBuilds();
            break;
          case 'Event':
            this.getEvents();
            break;
          case 'Content':
            this.getContent();
            break;
          // case 'Newsletter':
          //   this.getNewsletter();
          // break;
        }
        // this.searchLoader = false;
      });
    }
    // this.searchLoader = false;
  }
}
