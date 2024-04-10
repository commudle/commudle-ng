import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-events-agenda',
  templateUrl: './events-agenda.component.html',
  styleUrls: ['./events-agenda.component.scss'],
})
export class EventsAgendaComponent implements OnInit {
  community: ICommunity;
  event: IEvent;
  communityId: string;
  eventId: string;
  faArrowLeft = faArrowLeft;
  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private eventsService: EventsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.communityId = params.community_id;
    this.eventId = params.event_id;
    this.getCommunity();
    this.getEvent();
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.communityId).subscribe((data) => {
      this.community = data;
    });
  }

  getEvent() {
    this.eventsService.pGetEvent(this.eventId).subscribe((data) => {
      this.event = data;
      this.setSeoService();
    });
  }

  setSeoService() {
    if (this.community) {
      this.seoService.setTags(
        `Agenda - ${this.event.name} - ${this.community.name}`,
        'Enter the world of techies and knowledge, just one step to begin your journey. Login or sign up now!',
        'https://commudle.com/assets/images/commudle-logo192.png',
      );
    }
  }
}
