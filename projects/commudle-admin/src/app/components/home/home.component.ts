import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { NbSidebarService } from '@nebular/theme';
import { CommunitiesService } from '../../services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: ICurrentUser;
  communities: ICommunity[] = [];

  upcomingEvents: IEvent[] = [];
  pastEvents: IEvent[] = [];
  shineIndex = 0;

  photoGrid = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
    this.getCommunities();
    this.getUpcomingEvents();
  }

  login() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }


  getCommunities() {
    this.communitiesService.pGetCommunities().subscribe(
      data => {
        this.communities = data.communities;
        this.randomShine();
      }
    );
  }

  randomShine() {
    setInterval(() => {
      this.shineIndex = Math.floor(Math.random() * this.communities.length) + 0;
    }, 1000);
  }

  getUpcomingEvents() {
    this.eventsService.pGetUpcomingEvents().subscribe(
      data => {
        this.upcomingEvents = data.events;
        if (this.upcomingEvents.length === 0) {
          this.getRandomPastEvents();
        }
      }
    );
  }

  getRandomPastEvents() {
    this.eventsService.pGetRandomPastEvents(4).subscribe(
      data => {
        this.pastEvents = data.events;
      }
    );
  }

}
