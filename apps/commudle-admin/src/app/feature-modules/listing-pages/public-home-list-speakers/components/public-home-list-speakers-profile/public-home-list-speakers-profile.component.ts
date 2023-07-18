import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ListingPagesFilterTypes } from 'apps/shared-models/enums/listing-pages-filter-types';
@Component({
  selector: 'commudle-public-home-list-speakers-profile',
  templateUrl: './public-home-list-speakers-profile.component.html',
  styleUrls: ['./public-home-list-speakers-profile.component.scss'],
})
export class PublicHomeListSpeakersProfileComponent implements OnInit {
  speakers: IUser[] = [];
  page_info: IPageInfo;
  loading = false;
  loadingSpeakers = false;
  total: number;
  limit = 9;
  skeletonLoaderCard = true;
  timePeriod: string;
  month = false;
  year = false;
  queryParamsString = '';
  employment: string;
  employer = false;
  employee = false;
  searchForm;
  query = '';
  isLoadingSearch = false;
  page = 1;
  count = 10;
  totalSearch = 0;
  listingPagesFilterTypes = ListingPagesFilterTypes;

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

  ngOnInit(): void {
    this.seoService.setTags(
      'Speakers - Find & Connect With Tech & Design Speakers',
      'All the tech speakers from developer communities at one place, from web development, android to ML and AI, find a speaker for your next event or connect with them to learn the latest updates in tech.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );

    this.search();
    const params = this.activatedRoute.snapshot.queryParams;
    if (Object.keys(params).length > 0) {
      if (params.monthly || params.yearly) {
        if (params.monthly) {
          this.timePeriod = 'monthly';
          this.month = true;
          this.year = false;
        }
        if (params.yearly) {
          this.timePeriod = 'yearly';
          this.month = false;
          this.year = true;
        }
      }
      if (params.employer || params.employee) {
        if (params.employer) {
          this.employment = 'employer';
          this.employer = true;
          this.employee = false;
        }
        if (params.employee) {
          this.employment = 'employee';
          this.employer = false;
          this.employee = true;
        }
      }
      if (params.query) {
        this.query = params.query;
        this.searchForm.get('name').setValue(this.query);
      }
    }
    this.speakers = [];
    if (!params.query) {
      this.getSpeakersList();
    }
  }

  updateFilter() {
    this.month = this.timePeriod === this.listingPagesFilterTypes.MONTHLY ? true : false;
    this.year = this.timePeriod === this.listingPagesFilterTypes.YEARLY ? true : false;
    this.employee = this.employment === this.listingPagesFilterTypes.EMPLOYEE ? true : false;
    this.employer = this.employment === this.listingPagesFilterTypes.EMPLOYER ? true : false;
    this.skeletonLoaderCard = true;
    this.speakers = [];
    this.page_info = null;
    this.generateParams(this.month, this.year, this.employee, this.employer, this.query);
  }

  search() {
    this.query = '';
    this.searchForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      if (this.isLoadingSearch) {
        return;
      }
      this.speakers = [];
      this.page_info = null;
      this.isLoadingSearch = true;
      this.query = this.searchForm.get('name').value;
      this.queryParamsString = this.query;
      this.generateParams(this.month, this.year, this.employee, this.employer, this.query);
    });
  }

  generateParams(monthly, yearly, employee, employer, query) {
    this.skeletonLoaderCard = true;
    const queryParams: { [key: string]: any } = {};
    if (monthly) {
      queryParams.monthly = true;
    }

    if (yearly) {
      queryParams.yearly = true;
    }

    if (employee) {
      queryParams.employee = true;
    }

    if (employer) {
      queryParams.employer = true;
    }

    if (query) {
      queryParams.query = query;
    }
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    this.location.replaceState(location.pathname, queryParamsString);
    this.getSpeakersList();
  }

  resetFiltersAndSearch() {
    this.timePeriod = '';
    this.month = false;
    this.year = false;
    this.employment = '';
    this.employer = false;
    this.employee = false;
    this.searchForm.get('name').setValue('');
    this.query = '';
    this.speakers = [];
    this.page_info = null;
  }

  getSpeakersList() {
    this.loading = true;
    if (this.loadingSpeakers) {
      return;
    }
    this.loadingSpeakers = true;
    if (!this.page_info?.end_cursor) {
      this.speakers = [];
    }

    this.communitiesService
      .getSpeakersList(
        false,
        this.page_info?.end_cursor,
        this.limit,
        this.query,
        this.month,
        this.year,
        this.employer,
        this.employee,
      )
      .subscribe((data) => {
        this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.total = data.total;
        this.page_info = data.page_info;
        this.skeletonLoaderCard = false;
        this.loadingSpeakers = false;
        this.loading = false;
        this.isLoadingSearch = false;
      });
  }
}
