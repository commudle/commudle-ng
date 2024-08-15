import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICommunity, ICommunityBuild, IEvent, ILab, ISpeakerResource, IUser } from '@commudle/shared-models';
import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { TitleCasePipe } from '@angular/common';
import { ISessions } from 'apps/shared-models/sessions.model';
import { INewsletter } from 'apps/shared-models/newsletter.model';
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

  users: IUser[] = [];
  communities: ICommunity[] = [];
  labs: ILab[] = [];
  builds: ICommunityBuild[] = [];
  events: IEvent[] = [];
  socialResources: ISpeakerResource[] = [];
  speakerResources: ISessions[] = [];
  upcomingEvents: IEvent[] = [];
  communityNewsletters: INewsletter[] = [];
  mainNewsletters: INewsletter[] = [];

  usersPage = 1;
  communitiesPage = 1;
  labsPage = 1;
  buildsPage = 1;
  eventsPage = 1;
  socialResourcesPage = 1;
  speakerResourcesPage = 1;
  peakerResources;
  upcomingEventsPage = 1;
  communityNewslettersPage = 1;
  mainNewslettersPage = 1;

  usersTotal = 0;
  communitiesTotal = 0;
  labsTotal = 0;
  buildsTotal = 0;
  eventsTotal = 0;
  socialResourcesTotal = 0;
  speakerResourcesTotal = 0;
  upcomingEventsTotal = 0;
  communityNewslettersTotal = 0;
  mainNewslettersTotal = 0;

  searchLoader = true;
  canLoadMoreUser = false;
  canLoadMoreCommunity = false;
  canLoadMoreLab = false;
  canLoadMoreBuild = false;
  canLoadMoreEvent = false;
  canLoadMoreContent = false;
  canLoadMoreUpcomingEvents = false;
  canLoadMoreSpeakerResources = false;
  canLoadMoreCommunityNewsletters = false;
  canLoadMoreMainNewsletters = false;

  seoTitle = '';
  seoDescription = '';
  currentFragment = '';

  constructor(
    private searchService: SearchService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private searchStatusService: SearchStatusService,
    private gtm: GoogleTagManagerService,
    private titlecasePipe: TitleCasePipe,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchStatusService.setSearchStatus(false);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchLoader = true;
      this.query = params.query;
      this.updateSeoTitle();

      this.filters = [];
      this.selectedFilters = ['All'];
      this.results = [];
      this.total = 0;
      this.getAllData();
    });
    this.activatedRoute.fragment.subscribe((fragment) => {
      this.currentFragment = fragment ? fragment : '';
    });
  }

  ngOnDestroy(): void {
    this.searchStatusService.setSearchStatus(true);
  }

  clearResults() {
    this.total = 0;
    this.users = [];
    this.communities = [];
    this.labs = [];
    this.builds = [];
    this.events = [];
    this.socialResources = [];
    this.speakerResources = [];
    this.upcomingEvents = [];
    this.communityNewsletters = [];
    this.mainNewsletters = [];
    this.usersPage = 1;
    this.communitiesPage = 1;
    this.labsPage = 1;
    this.buildsPage = 1;
    this.eventsPage = 1;
    this.socialResourcesPage = 1;
    this.speakerResourcesPage = 1;
    this.upcomingEventsPage = 1;
    this.communityNewslettersPage = 1;
    this.mainNewslettersPage = 1;
    this.usersTotal = 0;
    this.communitiesTotal = 0;
    this.labsTotal = 0;
    this.buildsTotal = 0;
    this.eventsTotal = 0;
    this.socialResourcesTotal = 0;
    this.speakerResourcesTotal = 0;
    this.upcomingEventsTotal = 0;
    this.communityNewslettersTotal = 0;
    this.mainNewslettersTotal = 0;
  }

  getUsers() {
    this.canLoadMoreUser = true;
    this.searchService.getSearchResults(this.query, this.usersPage, this.count, 'User').subscribe((value: any) => {
      this.users = [...this.users, ...value.results];
      if (this.users.length > 0 && !this.filters.includes('Users')) {
        this.filters.push('Users');
      }
      if (this.usersPage === 1) {
        this.usersTotal = value.total;
        this.total += this.usersTotal;
      }
      this.usersPage++;
      this.gtmService(this.query);
      this.searchLoader = false;
      this.canLoadMoreUser = false;
    });
  }

  getCommunity() {
    this.canLoadMoreCommunity = true;
    this.searchService
      .getSearchResults(this.query, this.communitiesPage, this.count, 'Kommunity')
      .subscribe((value: any) => {
        this.communities = [...this.communities, ...value.results];
        if (this.communities.length > 0 && !this.filters.includes('Communities')) {
          this.filters.push('Communities');
        }
        if (this.communitiesPage === 1) {
          this.communitiesTotal = value.total;
          this.total += this.communitiesTotal;
        }
        this.communitiesPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreCommunity = false;
      });
  }

  getLabs() {
    this.canLoadMoreLab = true;
    this.searchService.getSearchResults(this.query, this.labsPage, this.count, 'Lab').subscribe((value: any) => {
      this.labs = [...this.labs, ...value.results];
      if (this.labs.length > 0 && !this.filters.includes('Labs')) {
        this.filters.push('Labs');
      }
      if (this.labsPage === 1) {
        this.labsTotal = value.total;
        this.total += this.labsTotal;
      }
      this.labsPage++;
      this.gtmService(this.query);
      this.searchLoader = false;
      this.canLoadMoreLab = false;
    });
  }

  getBuilds() {
    this.canLoadMoreBuild = true;
    this.searchService
      .getSearchResults(this.query, this.buildsPage, this.count, 'CommunityBuild')
      .subscribe((value: any) => {
        this.builds = [...this.builds, ...value.results];
        if (this.builds.length > 0 && !this.filters.includes('Builds')) {
          this.filters.push('Builds');
        }
        if (this.buildsPage === 1) {
          this.buildsTotal = value.total;
          this.total += this.buildsTotal;
        }
        this.buildsPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreBuild = false;
      });
  }

  getEvents() {
    this.canLoadMoreEvent = true;
    this.searchService.getSearchResults(this.query, this.eventsPage, this.count, 'Event').subscribe((value: any) => {
      this.events = [...this.events, ...value.results];
      if (this.events.length > 0 && !this.filters.includes('Events')) {
        this.filters.push('Events');
      }
      if (this.eventsPage === 1) {
        this.eventsTotal = value.total;
        this.total += this.eventsTotal;
      }
      this.eventsPage++;
      this.gtmService(this.query);
      this.searchLoader = false;
      this.canLoadMoreEvent = false;
    });
  }

  getContent() {
    this.canLoadMoreContent = true;
    this.searchService
      .getSearchResults(this.query, this.socialResourcesPage, this.count, 'SocialResource')
      .subscribe((value: any) => {
        this.socialResources = [...this.socialResources, ...value.results];
        if (this.socialResources.length > 0 && !this.filters.includes('Content')) {
          this.filters.push('Content');
        }
        if (this.socialResourcesPage === 1) {
          this.socialResourcesTotal = value.total;
          this.total += this.socialResourcesTotal;
        }
        this.socialResourcesPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreContent = false;
      });
  }

  getSpeakerResources() {
    this.canLoadMoreSpeakerResources = true;
    this.searchService
      .getSearchResults(this.query, this.speakerResourcesPage, this.count, 'SpeakerResource')
      .subscribe((value: any) => {
        this.speakerResources = [...this.speakerResources, ...value.results];
        if (this.speakerResources.length > 0 && !this.filters.includes('Tech Talks')) {
          this.filters.push('Tech Talks');
        }
        if (this.speakerResourcesPage === 1) {
          this.speakerResourcesTotal = value.total;
          this.total += this.speakerResourcesTotal;
        }
        this.speakerResourcesPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreSpeakerResources = false;
      });
  }

  getUpcomingEvents() {
    this.canLoadMoreUpcomingEvents = true;
    this.searchService
      .getSearchResults(this.query, this.upcomingEventsPage, this.count, 'UpcomingEvents')
      .subscribe((value: any) => {
        this.upcomingEvents = [...this.upcomingEvents, ...value.results];
        if (this.upcomingEvents.length > 0 && !this.filters.includes('Upcoming Events')) {
          this.filters.push('Upcoming Events');
        }
        if (this.upcomingEventsPage === 1) {
          this.upcomingEventsTotal = value.total;
          this.total += this.upcomingEventsTotal;
        }
        this.upcomingEventsPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreUpcomingEvents = false;
      });
  }

  getCommunityNewsletters() {
    this.canLoadMoreCommunityNewsletters = true;
    this.searchService
      .getSearchResults(this.query, this.communityNewslettersPage, this.count, 'Newsletter')
      .subscribe((value: any) => {
        this.communityNewsletters = [...this.communityNewsletters, ...value.results];
        if (this.communityNewsletters.length > 0 && !this.filters.includes('Community Newsletters')) {
          this.filters.push('Community Newsletters');
        }
        if (this.communityNewslettersPage === 1) {
          this.communityNewslettersTotal = value.total;
          this.total += this.communityNewslettersTotal;
        }
        this.communityNewslettersPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreCommunityNewsletters = false;
      });
  }

  getMainNewsletters() {
    this.canLoadMoreMainNewsletters = true;
    this.searchService
      .getSearchResults(this.query, this.mainNewslettersPage, this.count, 'MainNewsletter')
      .subscribe((value: any) => {
        this.mainNewsletters = [...this.mainNewsletters, ...value.results];
        if (this.mainNewsletters.length > 0 && !this.filters.includes('Commudle Newsletters')) {
          this.filters.push('Commudle Newsletters');
        }
        if (this.mainNewslettersPage === 1) {
          this.mainNewslettersTotal = value.total;
          this.total += this.mainNewslettersTotal;
        }
        this.mainNewslettersPage++;
        this.gtmService(this.query);
        this.searchLoader = false;
        this.canLoadMoreMainNewsletters = false;
      });
  }

  onFilterChange(filter: string) {
    this.router.navigate([], { fragment: null });
    this.searchLoader = true;
    this.clearResults();

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
      this.selectedFilters = ['All'];
      this.total = 0;
      // this.searchLoader = false;
    }
    this.getAllData();
  }

  gtmService(query) {
    this.gtm.dataLayerPushEvent('search_query', { query });
  }

  getAllData() {
    this.searchLoader = true;
    if (this.selectedFilters.includes('All')) {
      this.getUsers();
      this.getCommunity();
      this.getLabs();
      this.getBuilds();
      this.getEvents();
      this.getContent();
      this.getSpeakerResources();
      this.getCommunityNewsletters();
      this.getMainNewsletters();
      // this.getUpcomingEvents();
    } else {
      this.selectedFilters.forEach((filter) => {
        switch (filter) {
          case 'Users':
            this.getUsers();
            break;
          case 'Communities':
            this.getCommunity();
            break;
          case 'Labs':
            this.getLabs();
            break;
          case 'Builds':
            this.getBuilds();
            break;
          case 'Events':
            this.getEvents();
            break;
          case 'Content':
            this.getContent();
            break;
          case 'Tech Talks':
            this.getSpeakerResources();
            break;
          case 'Community Newsletters':
            this.getCommunityNewsletters();
            break;
          case 'Commudle Newsletters':
            this.getMainNewsletters();
            break;
          // case 'Upcoming Events':
          //   this.getUpcomingEvents();
          //   break;
        }
      });
    }
  }

  updateSeoTitle() {
    this.query = this.titlecasePipe.transform(this.query);
    this.seoTitle = this.query
      ? `${this.query} - Find Developers, Communities, Events, Projects & Tutorials`
      : 'Find Developers, Communities, Events, Projects & Tutorials';
    this.seoDescription = this.query
      ? `Search results for ${this.query}. You can find software developers, their communities and events for ${this.query} and also their projects & tutorials.`
      : 'You can find software developers, their communities, events and also their projects & tutorials.';
    this.seoService.setTags(
      this.seoTitle,
      this.seoDescription,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
