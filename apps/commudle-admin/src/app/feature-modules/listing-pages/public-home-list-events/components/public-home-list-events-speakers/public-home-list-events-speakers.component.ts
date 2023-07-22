import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-public-home-list-events-speakers',
  templateUrl: './public-home-list-events-speakers.component.html',
  styleUrls: ['./public-home-list-events-speakers.component.scss'],
})
export class PublicHomeListEventsSpeakersComponent implements OnInit {
  @Input() parentType: string;
  faMicrophone = faMicrophone;
  speakers: IUser[] = [];
  event_id: string;
  community_id: string;
  page_info: IPageInfo;
  total: number;
  isLoadingSpeakers = false;
  showSpinner = false;
  showSkeletonLoading = true;
  limit = 4;
  mini = true;

  constructor(
    private communitiesService: CommunitiesService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.event_id) {
      this.event_id = params.event_id;
    }
    if (params.community_id) {
      this.community_id = params.community_id;
    }

    switch (this.parentType) {
      case 'communities': {
        this.getAllSpeakersList();
        break;
      }
      case 'events': {
        this.getEventsSpeakersList();
        break;
      }
    }
  }

  getEventsSpeakersList() {
    if (this.isLoadingSpeakers) {
      return;
    }
    this.isLoadingSpeakers = true;
    this.eventsService.getSpeakersList(this.page_info?.end_cursor, this.limit, this.event_id).subscribe((data) => {
      this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.isLoadingSpeakers = false;
      this.showSpinner = false;
      this.showSkeletonLoading = false;
    });
  }

  getAllSpeakersList() {
    if (this.isLoadingSpeakers) {
      return;
    }
    this.isLoadingSpeakers = true;
    this.communitiesService.getSpeakersList(this.mini, this.page_info?.end_cursor, this.limit).subscribe((data) => {
      this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.isLoadingSpeakers = false;
      this.showSpinner = false;
      this.showSkeletonLoading = false;
    });
  }
}
