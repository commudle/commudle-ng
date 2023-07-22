import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { SocialResourceService } from 'apps/commudle-admin/src/app/services/social-resource.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';

@Component({
  selector: 'commudle-public-home-list-speakers-content',
  templateUrl: './public-home-list-speakers-content.component.html',
  styleUrls: ['./public-home-list-speakers-content.component.scss'],
})
export class PublicHomeListSpeakersContentComponent implements OnInit {
  @Input() parentType: string;
  @Input() heading = 'Content you can explore';
  @Input() subheading = 'This is content published by users';
  event_id: string;
  speakersContents: ISpeakerResource[] = [];
  showSpinner = false;
  page_info: IPageInfo;
  total: number;
  isLoadingTechSessions = false;
  showSkeletonCard = true;
  limit = 3;

  constructor(
    private socialResourceService: SocialResourceService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.event_id) {
      this.event_id = params.event_id;
    }

    switch (this.parentType) {
      case 'communities': {
        this.getAllCommunitiesContentList();
        break;
      }
      case 'events': {
        this.getEventsContentList();
        break;
      }
    }
  }

  getAllCommunitiesContentList() {
    this.isLoadingTechSessions = true;
    this.showSpinner = true;
    this.socialResourceService.getSpeakersContent(this.page_info?.end_cursor, this.limit).subscribe((data) => {
      this.speakersContents = this.speakersContents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.showSkeletonCard = false;
      this.isLoadingTechSessions = false;
      this.showSpinner = false;
    });
  }

  getEventsContentList() {
    this.isLoadingTechSessions = true;
    this.showSpinner = true;
    this.eventsService.getSocialResources(this.page_info?.end_cursor, this.limit, this.event_id).subscribe((data) => {
      this.speakersContents = this.speakersContents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.showSkeletonCard = false;
      this.isLoadingTechSessions = false;
      this.showSpinner = false;
    });
  }
}
