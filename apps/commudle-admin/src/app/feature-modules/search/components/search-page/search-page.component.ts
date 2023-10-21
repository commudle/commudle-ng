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
//     // console.log(filter);
//     console.log(this.selectedFilters);
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
  total = -1;
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

  // searchLoader = false;
  // loadMoreLoader = false;
  // showSpinner = true;
  // getPicture = getPicture;
  // getTitle = getTitle;
  // navigate = navigate;

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

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // this.searchLoader = true;

      // this.results = [];
      // this.total = -1;
      // this.page = 1;
      // this.filters = [];

      this.query = params.q;
      // this.users = [];
      // this.communities = [];
      // this.labs = [];
      // this.builds = [];
      // this.events = [];
      // this.content = [];
      // this.blogs = [];
      // this.newsletters = [];
      this.selectedFilters = ['All'];
      this.getAllData();
      // this.getSearchData();
      // this.getUsers();
      // this.getCommunity();
      // this.getLabs();
      // this.getBuilds();
      // this.getEvents();
      // this.getContent();
      // // this.getBlogs();
      // this.getNewsletter();
    });

    this.searchService.getSearchResults(this.query, this.page, this.count).subscribe((value: ISearch) => {
      this.seoService.setTitle(`Search results for "${this.query}"`);
      console.log(value, 'value');
      this.results = [...this.results, ...value.results];
      // console.log(this.results);
      this.filters = [
        ...new Set(
          this.results.map((result) => {
            if (result) {
              return result.type;
            }
          }),
        ),
      ];
      // this.results = [];
      // this.total = -1;
      // this.page = 1;
      // this.filters = [];
      // this.selectedFilters = [];
      this.getUsers();
      this.getCommunity();
      this.getLabs();
      this.getBuilds();
      this.getEvents();
      this.getContent();
      this.getNewsletter();

      // this.searchLoader = false;
      // this.loadMoreLoader = false;
      // this.gtmService(this.query);
    });
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.searchStatusService.setSearchStatus(true);
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
    this.searchService.getSearchResults(this.query, this.page, this.count, 'User').subscribe((value: any) => {
      this.users = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total = value.total;
      this.page++;
      this.gtmService(this.query);

      // this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getCommunity() {
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Kommunity').subscribe((value: any) => {
      this.communities = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total = value.total;
      this.page++;
      this.gtmService(this.query);

      // this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getLabs() {
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Lab').subscribe((value: any) => {
      this.labs = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total = value.total;
      this.page++;
      this.gtmService(this.query);

      // this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }
  getBuilds() {
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Build').subscribe((value: any) => {
      // console.log(value.results, 'value build');
      this.builds = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total = value.total;
      this.page++;
      this.gtmService(this.query);

      // this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }
  getEvents() {
    this.searchService.getSearchResults(this.query, this.page, this.count, 'Event').subscribe((value: any) => {
      // console.log(value.results, 'value event');
      this.events = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total = value.total;
      this.page++;
      this.gtmService(this.query);

      // this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }
  getContent() {}
  getBlogs() {}
  getNewsletter() {}

  onFilterChange(filter: string) {
    console.log('called onfilter change');
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters.push(filter);
      console.log(this.selectedFilters, 'selected Filter');
      // this.getAllData();
      // this.getUsers();
      // this.getCommunity();
      // this.getLabs();
    }
  }

  gtmService(query) {
    this.gtm.dataLayerPushEvent('search_query', { query });
  }

  getAllData() {
    if (this.selectedFilters.includes('User')) {
      console.log('user');
      this.getUsers();
    }
    if (this.selectedFilters.includes('Community')) {
      console.log('kommunity');
      this.getCommunity();
    }
    if (this.selectedFilters.includes('Lab ')) {
      console.log('lab');
      this.getLabs();
    }
    if (this.selectedFilters.includes('Community Build')) {
      console.log('build');
      this.getBuilds();
    }
    if (this.selectedFilters.includes('Event')) {
      console.log('event');
      this.getEvents();
    }
    if (this.selectedFilters.includes('Content')) {
      console.log('content');
      this.getContent();
    }
    if (this.selectedFilters.includes('Newsletter')) {
      console.log('newletter');
      this.getNewsletter();
    }
    // this.getBlogs();
  }
}
