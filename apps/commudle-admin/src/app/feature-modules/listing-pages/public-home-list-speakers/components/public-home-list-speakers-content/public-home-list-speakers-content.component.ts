import { Component, OnInit } from '@angular/core';
import { IPageInfo } from 'apps/shared-models/page-info.model';

@Component({
  selector: 'commudle-public-home-list-speakers-content',
  templateUrl: './public-home-list-speakers-content.component.html',
  styleUrls: ['./public-home-list-speakers-content.component.scss'],
})
export class PublicHomeListSpeakersContentComponent implements OnInit {
  // showSpinner = false;
  // page_info: IPageInfo;
  // total: number;
  // isLoadingTechSessions = false;
  // limit = 5;
  // constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    // this.getContent();
  }

  // getContent() {
  //   this.isLoadingTechSessions = true;
  //   this.showSpinner = true;
  //   this.eventsService.getTechSessions(this.page_info?.end_cursor, this.limit).subscribe((data) => {
  //     this.techSessions = this.techSessions.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
  //     this.total = data.total;
  //     this.page_info = data.page_info;
  //     this.isLoadingTechSessions = false;
  //     this.showSpinner = false;
  //   });
  // }
}
