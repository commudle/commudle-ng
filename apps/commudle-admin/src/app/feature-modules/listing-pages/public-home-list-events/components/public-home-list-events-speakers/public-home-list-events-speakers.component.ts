import { Component, OnInit } from '@angular/core';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-public-home-list-events-speakers',
  templateUrl: './public-home-list-events-speakers.component.html',
  styleUrls: ['./public-home-list-events-speakers.component.scss'],
})
export class PublicHomeListEventsSpeakersComponent implements OnInit {
  faMicrophone = faMicrophone;
  speakers: IUser[] = [];

  page_info: IPageInfo;
  total: number;
  isLoadingSpeakers = false;
  showSpinner = false;
  showSkeletonLoading = true;
  limit = 4;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getSpeakersList();
  }

  getSpeakersList() {
    this.isLoadingSpeakers = true;
    this.eventsService.getSpeakersList(this.page_info?.end_cursor, this.limit).subscribe((data) => {
      this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.isLoadingSpeakers = false;
      this.showSpinner = false;
      this.showSkeletonLoading = false;
    });
  }
}
