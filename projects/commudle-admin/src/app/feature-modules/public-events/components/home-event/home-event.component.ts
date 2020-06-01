import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { Title } from '@angular/platform-browser';
import { NbSidebarService } from '@nebular/theme';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.scss']
})
export class HomeEventComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;

  community: ICommunity;
  event: IEvent;
  discussionChat: IDiscussion;

  hasUpdates = false;
  hasAgenda = false;
  hasSpeakers = false;
  hasCollaborationCommunities = false;
  hasVolunteers = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private title: Title,
    private sidebarService: NbSidebarService,
    private discussionsService: DiscussionsService
  ) { }

  scroll(el: HTMLElement) {
    el.scrollIntoView(true);
  }

  ngOnInit() {
    this.sidebarService.toggle(true, 'right');
    this.activatedRoute.params.subscribe(
      params => {
        this.getEvent(params.event_id);
      }
    );
  }

  getEvent(eventId) {
    this.eventsService.pGetEvent(eventId).subscribe(
      event => {
        this.event = event;
        this.getCommunity(event.kommunity_id);
        this.getDiscussionChat();
      }
    );
  }

  getCommunity(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe(
      community => {
        this.community = community;
        this.title.setTitle(`${this.event.name} | ${this.community.name}`);
      }
    );
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForEventChat(this.event.id).subscribe(
      data => this.discussionChat = data
    );
  }



}
