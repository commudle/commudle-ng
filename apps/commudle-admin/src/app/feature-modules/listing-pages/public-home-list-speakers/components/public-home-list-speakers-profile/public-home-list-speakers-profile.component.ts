import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IPagination } from 'apps/shared-models/pagination.model';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-public-home-list-speakers-profile',
  templateUrl: './public-home-list-speakers-profile.component.html',
  styleUrls: ['./public-home-list-speakers-profile.component.scss'],
})
export class PublicHomeListSpeakersProfileComponent implements OnInit {
  speakers: IUser[] = [];
  // speakers: any[] = [];
  page_info: IPageInfo;
  loading = false;
  total: number;
  limit = 6;
  skeletonLoaderCard = true;

  constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getSpeakersList();
  }

  getSpeakersList() {
    this.loading = true;
    this.eventsService.getSpeakersList(this.page_info?.end_cursor, this.limit).subscribe((data) => {
      this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.skeletonLoaderCard = false;
      this.loading = false;
    });
  }
}
