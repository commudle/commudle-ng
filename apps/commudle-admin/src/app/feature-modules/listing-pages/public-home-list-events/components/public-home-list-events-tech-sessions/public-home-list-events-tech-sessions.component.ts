import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ISessions } from 'apps/shared-models/sessions.model';

@Component({
  selector: 'commudle-public-home-list-events-tech-sessions',
  templateUrl: './public-home-list-events-tech-sessions.component.html',
  styleUrls: ['./public-home-list-events-tech-sessions.component.scss'],
})
export class PublicHomeListEventsTechSessionsComponent implements OnInit {
  techSessions: ISessions[] = [];
  faHeadset = faHeadset;
  showSpinner = false;
  page_info: IPageInfo;
  total: number;
  isLoadingTechSessions = false;
  showSkeletonCard = true;
  limit = 4;
  communityGroupId: number;

  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((data) => {
      if (data) {
        this.communityGroupId = data.community_group?.id;
      }
      this.getTechSessions();
    });
  }

  getTechSessions() {
    this.isLoadingTechSessions = true;
    this.showSpinner = true;
    this.eventsService
      .getTechSessions(this.page_info?.end_cursor, this.limit, this.communityGroupId)
      .subscribe((data) => {
        this.techSessions = this.techSessions.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.total = data.total;
        this.page_info = data.page_info;
        this.showSkeletonCard = false;
        this.isLoadingTechSessions = false;
        this.showSpinner = false;
      });
  }
}
