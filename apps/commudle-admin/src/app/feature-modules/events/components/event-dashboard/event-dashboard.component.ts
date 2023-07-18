import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { SeoService } from 'apps/shared-services/seo.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { faUpRightFromSquare, faUserGroup, faShareNodes, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;

  moment = moment;
  EEventStatuses = EEventStatuses;

  isLoading = false;

  icons = {
    faUpRightFromSquare,
    faClipboard,
    faUserGroup,
    faShareNodes,
    faCircleInfo,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);

    this.activatedRoute.data.subscribe((value) => {
      this.event = value.event;
      this.community = value.community;
      this.seoService.setTitle(`Admin - ${this.event.name} - ${this.community.name}`);
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  updateRegistrationType(value) {
    this.eventsService.updateCustomRegistration(this.event.id, value).subscribe((data) => {
      this.event = data;
    });
  }

  updateAgendaType(value) {
    this.eventsService.updateCustomAgenda(this.event.id, value).subscribe((data) => {
      this.event = data;
    });
  }
}
