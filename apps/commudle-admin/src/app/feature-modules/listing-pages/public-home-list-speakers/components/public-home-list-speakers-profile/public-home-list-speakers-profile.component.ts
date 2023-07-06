import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
// import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';

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
  queryParams = {};
  // isAllFilterSelected = false;
  // limit = 5;

  constructor(
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
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
        this.speakers = [];
        this.getSpeakersList();
      } else {
        this.speakers = [];
        this.getSpeakersList();
      }
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

  filter() {
    // this.isAllFilterSelected = false;
    if (this.timePeriod === 'monthly') {
      this.month = true;
      this.year = false;
      this.queryParams = {
        month: true,
      };
    }
    if (this.timePeriod === 'yearly') {
      this.month = false;
      this.year = true;
      this.queryParams = {
        year: true,
      };
    }
    this.speakers = [];
    this.router.navigate([], { queryParams: this.queryParams });
    this.page_info = null;
  }

  getSpeakersList() {
    this.loading = true;

    if (!this.page_info?.end_cursor) {
      this.speakers = [];
    }

    this.communitiesService
      .getSpeakersList(this.page_info?.end_cursor, this.limit, this.month, this.year)
      .subscribe((data) => {
        this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        console.log(this.speakers);
        this.total = data.total;
        this.page_info = data.page_info;
        this.skeletonLoaderCard = false;
        this.loading = false;
      });
  }
}
