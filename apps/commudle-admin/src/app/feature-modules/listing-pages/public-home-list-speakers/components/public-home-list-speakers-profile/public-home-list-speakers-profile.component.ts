import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
// import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'commudle-public-home-list-speakers-profile',
  templateUrl: './public-home-list-speakers-profile.component.html',
  styleUrls: ['./public-home-list-speakers-profile.component.scss'],
})
export class PublicHomeListSpeakersProfileComponent implements OnInit {
  speakers: IUser[] = [];
  page_info: IPageInfo;
  loading = false;
  total: number;
  limit = 6;
  skeletonLoaderCard = true;
  timePeriod: string;
  month = false;
  year = false;
  allTime = false;
  // queryParams = {};
  queryParams: { [key: string]: any } = {};
  employment: string;
  employer = false;
  employee = false;
  searchForm;
  query = '';
  isLoadingSearch = false;

  page = 1;
  count = 10;
  totalSearch = 0;
  // isAllFilterSelected = false;
  // limit = 5;

  constructor(
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.search();
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        if (params['monthly'] || params['yearly']) {
          if (params['monthly']) {
            this.timePeriod = 'monthly';
            this.month = true;
            this.year = false;
          }
          if (params['yearly']) {
            this.timePeriod = 'yearly';
            this.month = false;
            this.year = true;
          }
        }
        if (params['employer'] || params['employee']) {
          if (params['employer']) {
            this.employment = 'employer';
            this.employer = true;
            this.employee = false;
          }
          if (params['employee']) {
            this.employment = 'employee';
            this.employer = false;
            this.employee = true;
          }
        }
        this.speakers = [];
        this.getSpeakersList();
      }
      this.speakers = [];
      this.getSpeakersList();
    });
  }

  // getSpeakersList() {
  //   this.loading = true;
  //   this.eventsService.getSpeakersList(this.page_info?.end_cursor, this.limit).subscribe((data) => {
  //     this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
  //     this.total = data.total;
  //     this.page_info = data.page_info;
  //     this.skeletonLoaderCard = false;
  //     this.loading = false;
  //   });
  // }

  filterByTime() {
    if (this.timePeriod === 'monthly') {
      this.month = true;
      this.year = false;
      this.queryParams = {
        monthly: true,
      };
    }
    if (this.timePeriod === 'yearly') {
      this.month = false;
      this.year = true;
      this.queryParams = {
        yearly: true,
      };
    }

    if (this.employment === 'employer') {
      this.queryParams.employer = true;
    }
    if (this.employment === 'employee') {
      this.queryParams.employee = true;
    }
    this.speakers = [];
    this.page_info = null;
    this.router.navigate([], { queryParams: this.queryParams });
  }

  filterByEmployment() {
    if (this.employment === 'employer') {
      this.employer = true;
      this.employee = false;
      this.queryParams = {
        employer: true,
      };
    }
    if (this.employment === 'employee') {
      this.employer = false;
      this.employee = true;
      this.queryParams = {
        employee: true,
      };
    }

    if (this.month) {
      this.queryParams.month = true;
    }
    if (this.year) {
      this.queryParams.year = true;
    }
    this.speakers = [];
    this.page_info = null;
    this.router.navigate([], { queryParams: this.queryParams });
  }

  search() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(() => {
          this.speakers = [];
          this.query = this.searchForm.get('name').value;
          return this.communitiesService.getSpeakersList(
            false,
            this.page_info?.end_cursor,
            this.limit,
            this.query,
            this.month,
            this.year,
            this.employer,
            this.employee,
          );
        }),
      )
      .subscribe((data) => {
        this.isLoadingSearch = false;
        this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.page = +data.page;
        this.totalSearch = data.total;
      });
  }

  getSpeakersList() {
    if (this.loading) {
      return;
    }
    this.loading = true;

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
        this.loading = false;
      });
  }
}
