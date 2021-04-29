import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {ICommunity} from 'projects/shared-models/community.model';
import {IEvent} from 'projects/shared-models/event.model';
import {Meta, Title} from '@angular/platform-browser';
import {HomeService} from '../../services/home.service';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';
import {ILab} from 'projects/shared-models/lab.model';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  moment = moment;
  currentUser: ICurrentUser;
  communities: ICommunity[] = [];

  upcomingEvents: IEvent[] = [];
  pastEvents: IEvent[] = [];
  labs: ILab[] = [];
  communityBuilds: ICommunityBuild[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    private homeService: HomeService,
    private meta: Meta,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.setMeta();
    this.authWatchService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
    this.getCommunities();
    this.getUpcomingEvents();
    this.getLabs();
    this.getCommunityBuilds();
  }

  ngOnDestroy() {
  }

  setMeta() {
    this.title.setTitle('Commudle');
    this.meta.updateTag({
      name: 'description',
      content: 'Organize online events, share what you are building and connect with experts in Tech and Design. Login to begin!'
    });
    this.meta.updateTag({
      name: 'og:image',
      content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({
      name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Commudle, Growing With Developer Communities'
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'Organize online events, share what you are building and connect with experts in Tech and Design. Login to begin!'
    });
    this.meta.updateTag({
      name: 'og:type',
      content: 'website'
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Commudle, Growing With Developer Communities'
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Organize online events, share what you are building and connect with experts in Tech and Design. Login to begin!'
    });
  }

  login() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }

  getCommunities() {
    this.homeService.pCommunities().subscribe(data => this.communities = data.communities);
  }

  getUpcomingEvents() {
    this.homeService.pUpcomingEvents().subscribe(data => {
      this.upcomingEvents = data.events;
      if (this.upcomingEvents.length === 0) {
        this.getRandomPastEvents(5);
      }
    });
  }

  getRandomPastEvents(count) {
    this.homeService.pPastRandomEvents(count).subscribe(data => this.pastEvents = data.events);
  }

  getLabs() {
    this.homeService.pLabs().subscribe(data => this.labs = data.labs);
  }

  getCommunityBuilds() {
    this.homeService.pCommunityBuilds().subscribe(data => this.communityBuilds = data.community_builds);
  }

}
