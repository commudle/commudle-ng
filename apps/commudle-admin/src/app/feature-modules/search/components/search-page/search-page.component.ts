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
import { IPageInfo, IUser } from '@commudle/shared-models';
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
  count = 10;
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
  socialResources = [];

  page = 1;
  usersPage = 1;
  communitiesPage = 1;
  labsPage = 1;
  buildsPage = 1;
  eventsPage = 1;
  socialResourcesPage = 1;

  usersTotal = 1;

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
      console.log(params, 'params');
      this.query = params.q;

      // this.usersPage = 1;
      // this.communitiesPage = 1;
      // this.labsPage = 1;
      // this.buildsPage = 1;
      // this.eventsPage = 1;
      // this.socialResourcesPage = 1;
      // this.page = 1;

      this.filters = [];
      this.selectedFilters = ['All'];
      this.results = [];
      this.total = 0;
      // this.searchQuery();
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
    console.log('called');
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
    this.searchService.getSearchResults(this.query, this.usersPage, this.count, 'User').subscribe((value: any) => {
      // this.users = value.results;
      this.users = [...this.users, ...value.results];
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.usersTotal = value.total;
      this.total += value.total;
      this.usersPage++;
      this.gtmService(this.query);
      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getCommunity() {
    this.searchLoader = true;
    this.searchService
      .getSearchResults(this.query, this.communitiesPage, this.count, 'Kommunity')
      .subscribe((value: any) => {
        this.communities = value.results;
        this.seoService.setTitle(`Search results for "${this.query}"`);
        // this.results = [...this.results, ...value.results];
        this.total += value.total;
        this.communitiesPage++;
        this.gtmService(this.query);

        this.searchLoader = false;
        // this.loadMoreLoader = false;
      });
  }

  getLabs() {
    console.log('get labs');
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.labsPage, this.count, 'Lab').subscribe((value: any) => {
      this.labs = value.results;
      console.log(this.labs);
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.labsPage++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getBuilds() {
    this.searchLoader = true;
    this.searchService
      .getSearchResults(this.query, this.buildsPage, this.count, 'CommunityBuild')
      .subscribe((value: any) => {
        this.builds = value.results;
        console.log(value.results);
        this.seoService.setTitle(`Search results for "${this.query}"`);
        // this.results = [...this.results, ...value.results];
        this.total += value.total;
        this.buildsPage++;
        this.gtmService(this.query);

        this.searchLoader = false;
        // this.loadMoreLoader = false;
      });
  }

  getEvents() {
    this.searchLoader = true;
    this.searchService.getSearchResults(this.query, this.eventsPage, this.count, 'Event').subscribe((value: any) => {
      this.events = value.results;
      this.seoService.setTitle(`Search results for "${this.query}"`);
      // this.results = [...this.results, ...value.results];
      this.total += value.total;
      this.eventsPage++;
      this.gtmService(this.query);

      this.searchLoader = false;
      // this.loadMoreLoader = false;
    });
  }

  getContent() {
    this.searchLoader = true;
    this.searchService
      .getSearchResults(this.query, this.socialResourcesPage, this.count, 'SocialResource')
      .subscribe((value: any) => {
        this.socialResources = value.results;
        this.seoService.setTitle(`Search results for "${this.query}"`);
        // this.results = [...this.results, ...value.results];
        this.total += value.total;
        this.socialResourcesPage++;
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
    this.usersPage = 1;
    this.communitiesPage = 1;
    this.labsPage = 1;
    this.buildsPage = 1;
    this.eventsPage = 1;
    this.socialResourcesPage = 1;
    this.page = 1;
    if (filter !== 'All') {
      if (this.selectedFilters.includes('All')) this.selectedFilters = this.selectedFilters.filter((f) => f !== 'All');
    } else {
      this.selectedFilters = ['All'];
      this.getAllData();
      return;
    }

    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters.push(filter);
    }

    if (this.selectedFilters.length === 0) {
      this.total = 0;
      this.searchLoader = false;
      return;
    }
    this.getAllData();
  }

  gtmService(query) {
    this.gtm.dataLayerPushEvent('search_query', { query });
  }

  // getAllData() {
  //   console.log('called');
  //   this.searchLoader = true;
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
  //   if (this.selectedFilters.includes('SocialResource') || this.selectedFilters.includes('All')) {
  //     this.getContent();
  //   }
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
      console.log('else');
      this.selectedFilters.forEach((filter) => {
        switch (filter) {
          case 'User':
            this.getUsers();
            break;
          case 'Community':
            this.getCommunity();
            break;
          case 'Lab ':
            console.log('get labs called');
            this.getLabs();
            break;
          case 'Community Build':
            this.getBuilds();
            break;
          case 'Event':
            this.getEvents();
            break;
          case 'SocialResource':
            this.getContent();
            break;
          // case 'Newsletter':
          //   this.getNewsletter();
          // break;
        }
        // this.searchLoader = false;
      });

      // this.searchLoader = false;
    }
  }
}
