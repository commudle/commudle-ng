import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IPageInfo } from '@commudle/shared-models';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-attended-members',
  templateUrl: './attended-members.component.html',
  styleUrls: ['./attended-members.component.scss'],
})
export class AttendedMembersComponent implements OnInit, OnDestroy {
  event: IEvent;
  members: IUser[] = [];
  isLoading = false;
  employee = false;
  employer = false;
  pageInfo: IPageInfo;
  skeletonLoaderCard = true;
  searchForm;
  value = '';
  page = 1;
  count = 10;
  total = 0;
  query = '';
  canLoadMore = true;
  contentHeading = 'Content from attendees';
  contentSubheading = 'Explore what people at event are publishing';
  volunteerHeading = 'Event Team';
  volunteerSubheading = 'People who made it possible';

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private location: Location,
    private seoService: SeoService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.search();
    const params = this.activatedRoute.snapshot.queryParams;
    if (Object.keys(params).length > 0) {
      if (params.page) {
        this.page = Number(params.page);
      }

      if (params.employee) {
        this.value = 'employee';
        this.employer = false;
        this.employee = true;
      }

      if (params.employer) {
        this.value = 'employer';
        this.employer = true;
        this.employee = false;
      }

      if (params.query) {
        this.query = params.query;
        this.searchForm.get('name').setValue(this.query);
      }
    }
    this.activatedRoute.parent.data.subscribe((data) => {
      this.event = data.event;
    }),
      (this.members = []);
    if (!params.query) {
      this.getMembers();
    }

    this.seoService.setTags(
      `Members who attended ${this.event.name}`,
      `Connect with the community members who attended ${this.event.name} by ${this.activatedRoute.snapshot.params.community_id} with you`,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembers(): void {
    this.isLoading = true;
    if (!this.canLoadMore) {
      return;
    }
    this.canLoadMore = false;
    this.subscriptions.push(
      this.eventsService
        .getAttendedMembers(this.page, this.count, this.event.id, this.query, this.employer, this.employee)
        .subscribe((data) => {
          this.members = data.users;
          this.total = data.total;
          this.skeletonLoaderCard = false;
          this.isLoading = false;
          this.canLoadMore = true;
        }),
    );
  }

  search(): void {
    this.query = '';
    this.searchForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      this.members = [];
      this.pageInfo = null;
      this.query = this.searchForm.get('name').value;
      this.generateParams(this.employee, this.employer, this.query);
    });
    this.page = 1;
  }

  updateFilter() {
    this.employee = this.value === 'employee' ? true : false;
    this.employer = this.value === 'employer' ? true : false;
    this.skeletonLoaderCard = true;
    this.members = [];
    this.pageInfo = null;
    this.generateParams(this.employee, this.employer, this.query);
  }

  resetFiltersAndSearch() {
    this.skeletonLoaderCard = true;
    this.employer = false;
    this.employee = false;
    this.query = '';
    this.value = '';
    this.searchForm.get('name').setValue('');
    this.members = [];
    this.pageInfo = null;
  }

  generateParams(employee, employer, query) {
    this.skeletonLoaderCard = true;
    const queryParams: { [key: string]: any } = {};
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
    this.getMembers();
  }
}
