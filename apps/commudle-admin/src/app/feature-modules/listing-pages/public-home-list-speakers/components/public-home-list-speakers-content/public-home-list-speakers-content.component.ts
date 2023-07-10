import { Component, OnInit } from '@angular/core';
import { SocialResourceService } from 'apps/commudle-admin/src/app/services/social-resource.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';

@Component({
  selector: 'commudle-public-home-list-speakers-content',
  templateUrl: './public-home-list-speakers-content.component.html',
  styleUrls: ['./public-home-list-speakers-content.component.scss'],
})
export class PublicHomeListSpeakersContentComponent implements OnInit {
  speakersContents: ISpeakerResource[] = [];
  showSpinner = false;
  page_info: IPageInfo;
  total: number;
  isLoadingTechSessions = false;
  showSkeletonCard = true;
  limit = 3;

  constructor(private socialResourceService: SocialResourceService) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent() {
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
}
