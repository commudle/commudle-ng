import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { IEvent } from 'apps/shared-models/event.model';
import { SeoService } from 'apps/shared-services/seo.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { environment } from 'apps/commudle-admin/src/environments/environment';

@Component({
  selector: 'commudle-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  events: IEvent[] = [];
  subscriptions: Subscription[] = [];
  moment = moment;

  isLoading = true;
  upcomingEvents: IEvent[] = [];
  eventForSchema = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getEvents();
        this.setMeta();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setMeta() {
    this.seoService.setTags(
      `Events - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }

  getEvents() {
    this.subscriptions.push(
      this.communityGroupsService.events(this.communityGroup.slug).subscribe((data) => {
        this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.isLoading = false;
        this.setSchema();
      }),
    );
  }

  setSchema() {
    this.events.forEach((event) => {
      if (moment(event.end_time) > moment()) {
        this.upcomingEvents.push(event);
      }
    });
    if (this.upcomingEvents.length > 0) {
      for (const event of this.upcomingEvents) {
        this.eventForSchema.push({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.name,
          description: event.description.replace(/<[^>]*>/g, '').substring(0, 200),
          image: event.header_image_path ? event.header_image_path : event.kommunity.logo_image_path,
          startDate: event.start_time,
          endDate: event.end_time,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          organizer: {
            '@type': 'Organization',
            name: event.kommunity.name,
            url: environment.app_url + '/communities/' + event.kommunity.slug,
          },
          offers: {
            '@type': 'Offer',
            name: event.name,
            url: environment.app_url + '/communities/' + event.kommunity.slug + '/events/' + event.slug,
          },
        });
      }
      this.seoService.setSchema(this.events);
    }
  }
}
