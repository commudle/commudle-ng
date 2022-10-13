import { selectIsConnectedToRoom } from '@100mslive/hms-video-store';
import { isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserObjectVisitsService } from '@commudle/shared-components';
import { environment } from '@commudle/shared-environments';
import {
  EUserRoles,
  ICommunity,
  ICurrentUser,
  IDiscussion,
  IEmbeddedVideoStream,
  IEvent,
  ITrackSlot,
  IUser,
} from '@commudle/shared-models';
import { hmsActions, hmsStore } from '@commudle/shared-modules';
import {
  AppUsersService,
  EmbeddedVideoStreamsService,
  FooterService,
  LibAuthwatchService,
  SeoService,
  TrackSlotsService,
} from '@commudle/shared-services';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss'],
})
export class SessionPageComponent implements OnInit, OnDestroy {
  isBrowser: boolean = isPlatformBrowser(this.platformId);

  trackSlot: ITrackSlot;
  speaker: IUser;

  community: ICommunity;
  event: IEvent;

  discussion: IDiscussion;
  chat: IDiscussion;

  pollableId: number;
  pollableType: string;

  embeddedVideoStream: IEmbeddedVideoStream;

  moment = moment;

  userVisitData;

  startTime: Date;
  endTime: Date;

  currentUser: ICurrentUser;

  userRoles = [];
  subscriptions: Subscription[] = [];
  EUserRoles = EUserRoles;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackSlotsService: TrackSlotsService,
    private discussionsService: DiscussionsService,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private seoService: SeoService,
    private userObjectVisitsService: UserObjectVisitsService,
    private authWatchService: LibAuthwatchService,
    private location: Location,
    private cookieService: CookieService,
    private usersService: AppUsersService,
    @Inject(PLATFORM_ID) private platformId: object,
    private footerService: FooterService,
  ) {}

  setMeta() {
    this.seoService.setTags(
      `${this.event.name} | Live`,
      this.event.description.replace(/<[^>]*>/g, ''),
      this.event.header_image_path ? this.event.header_image_path : this.community.logo_path,
    );
  }

  ngOnInit() {
    this.resolveData();

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.getMyRoles();
      }),
    );

    // Hide Footer
    this.footerService.changeFooterStatus(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => value.unsubscribe());

    // Show Footer
    this.footerService.changeFooterStatus(true);
  }

  getMyRoles() {
    if (this.currentUser && this.community) {
      this.usersService.getMyRoles('Kommunity', this.community.id).subscribe((data) => (this.userRoles = data));
    }
  }

  resolveData() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.community = data.community;
        this.getMyRoles();
        this.event = data.event;
        this.setMeta();
        this.startTime = this.event.start_time;
        this.endTime = this.event.end_time;
        if (this.event.custom_agenda) {
          this.activatedRoute.queryParams.subscribe((params) => {
            this.getTrackSlot(params.track_slot_id);
            this.pollableId = params.track_slot_id;
            this.pollableType = 'TrackSlot';
          });
        } else {
          this.getEventEmbeddedVideoStream();
          this.getDiscussionQnA();
          this.getDiscussionChat();
          this.seoService.setTitle(`Live Session | ${this.event.name}`);
          this.pollableId = this.event.id;
          this.pollableType = 'Event';
        }
      }),
    );
  }

  getTrackSlot(trackSlotId) {
    this.trackSlotsService.pGetTrackSlot(trackSlotId).subscribe((data) => {
      this.trackSlot = data;
      this.getDiscussionQnA();
      this.getDiscussionChat();
      this.speaker = data.user;
      this.startTime = this.trackSlot.start_time;
      this.endTime = this.trackSlot.end_time;
      if (this.trackSlot.embedded_video_stream) {
        this.embeddedVideoStream = this.trackSlot.embedded_video_stream;
        this.markUserObjectVisit('TrackSlot', this.trackSlot.id);
      }

      if (this.speaker) {
        this.seoService.setTitle(`${this.speaker.name} | ${this.trackSlot.session_title}`);
        this.seoService.setTag('og:title', `${this.speaker.name} | ${this.trackSlot.session_title}`);
        this.seoService.setTag('twitter:title', `${this.speaker.name} | ${this.trackSlot.session_title}`);
      } else {
        this.seoService.setTitle(`${this.trackSlot.session_title}`);
        this.seoService.setTag('og:title', `${this.trackSlot.session_title}`);
        this.seoService.setTag('twitter:title', `${this.trackSlot.session_title}`);
      }
    });
  }

  getDiscussionQnA() {
    if (this.trackSlot) {
      this.discussionsService
        .pGetOrCreateQnAForTrackSlot(this.trackSlot.id)
        .subscribe((data) => (this.discussion = data));
    } else {
      this.discussionsService.pGetOrCreateQnAForEvent(this.event.id).subscribe((data) => (this.discussion = data));
    }
  }

  getDiscussionChat() {
    if (this.trackSlot) {
      this.discussionsService.pGetOrCreateChatForTrackSlot(this.trackSlot.id).subscribe((data) => (this.chat = data));
    } else {
      this.discussionsService.pGetOrCreateForEventChat(this.event.id).subscribe((data) => (this.chat = data));
    }
  }

  getEventEmbeddedVideoStream() {
    this.embeddedVideoStreamsService.pGet('Event', this.event.id).subscribe((data) => {
      if (data) {
        this.embeddedVideoStream = data;
        this.markUserObjectVisit('EmbeddedVideoStream', this.embeddedVideoStream.id);
      }
    });
  }

  markUserObjectVisit(objectType, objectId) {
    if (this.isBrowser) {
      this.userObjectVisitsService
        .create({
          url: this.location.path(),
          session_token: this.cookieService.get(environment.session_cookie_name),
          parent_type: objectType,
          parent_id: objectId,
          app_token: this.authWatchService.getAppToken(),
        })
        .subscribe();
    }
  }

  canDeactivate(): boolean {
    if (hmsStore.getState(selectIsConnectedToRoom)) {
      hmsActions.leave();
    }
    return true;
  }
}
