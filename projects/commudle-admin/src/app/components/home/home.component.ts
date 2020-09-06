import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { NbSidebarService } from '@nebular/theme';
import { CommunitiesService } from '../../services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventsService } from '../../services/events.service';
import { ExternalApisService } from '../../services/external-apis.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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
    private eventsService: EventsService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.setMeta();
    this.authWatchService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
    this.getCommunities();
    this.getUpcomingEvents();
  }

  ngOnDestroy() {
    console.log('destroyed');
  }

  setMeta() {
    this.title.setTitle("Commudle | Communities | Let's Share & Learn");
    this.meta.updateTag({
      name: 'description',
      content: 'Organize online events, share what you are building and connect with experts in Tech and Design. Login to begin!'
    });
    this.meta.updateTag({name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'og:title', content: "Commudle | Communities | Let's Share & Learn"});
    this.meta.updateTag({
      name: 'og:description',
      content: 'Organize online events, share what you are building and connect with experts in Tech and Design. Login to begin!'
    });
    this.meta.updateTag({name: 'og:type', content: 'website'});

    this.meta.updateTag({name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'twitter:title', content: "Commudle | Communities | Let's Share & Learn"});
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Organize online events, share what you are building and connect with experts in Tech and Design. Login to begin!'
    });
  }

  login() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }


  getCommunities() {
    this.communitiesService.pGetCommunities().subscribe(
      data => {
        this.communities = data.communities;
        // this.randomShine();
      }
    );
  }


  // this method is causing a problem in SSR
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
