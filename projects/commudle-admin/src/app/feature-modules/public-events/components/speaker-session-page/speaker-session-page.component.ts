import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, OnDestroy} from '@angular/core';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'projects/shared-models/user.model';
import * as moment from 'moment';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { Title, Meta } from '@angular/platform-browser';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { EmbeddedVideoStreamsService } from 'projects/commudle-admin/src/app/services/embedded-video-streams.service';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { NbSidebarService, NbToggleModule } from '@nebular/theme';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { UserObjectVisitsService } from 'projects/shared-components/services/user-object-visits.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { UserVisitsService } from 'projects/shared-services/user-visits.service';

@Component({
  selector: 'app-speaker-session-page',
  templateUrl: './speaker-session-page.component.html',
  styleUrls: ['./speaker-session-page.component.scss']
})
export class SpeakerSessionPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser: boolean = isPlatformBrowser(this.platformId);
  @ViewChild('videoContainer') private videoContainer: ElementRef;

  trackSlot: ITrackSlot;
  speaker: IUser;

  community: ICommunity;
  event: IEvent;

  dataFormEntityResponseGroup: IDataFormEntityResponseGroup;

  discussion: IDiscussion;
  chat: IDiscussion;
  currentTab;

  pollableType;
  pollableId;

  speakerResource: ISpeakerResource;
  embeddedVideoStream: IEmbeddedVideoStream;


  EEventStatuses = EEventStatuses;
  moment = moment;
  playerWidth;
  playerHeight;

  userVisitData;

  startTime;
  endTime;

  currentUser: ICurrentUser;
  chatCount = 0;
  questionCount = 0;

  userRoles = [];
  subscriptions = [];
  EUserRoles = EUserRoles;

  userCount = 0;
  isFullscreen = false;

  sidebarMinimize = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackSlotsService: TrackSlotsService,
    private discussionsService: DiscussionsService,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private title: Title,
    private meta: Meta,
    private userObjectVisitsService: UserObjectVisitsService,
    private authWatchService: LibAuthwatchService,
    private nbSidebarService: NbSidebarService,
    private location: Location,
    private cookieService: CookieService,
    private usersService: AppUsersService,
    private userVisitsService: UserVisitsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
  ) {}


  setMeta() {
    this.meta.updateTag({ name: 'description', content: `${this.event.description.replace(/<[^>]*>/g, '')}`});

    this.meta.updateTag(
      {
        name: 'og:image',
        content: `${this.event.header_image_path ? this.event.header_image_path : this.community.logo_path}`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `${this.event.header_image_path ? this.event.header_image_path : this.community.logo_path}`
      });
    this.meta.updateTag({ name: 'og:title', content: `${this.event.name} | Live` });
    this.meta.updateTag({ name: 'og:description', content: `${this.event.description.replace(/<[^>]*>/g, '')}`});
    this.meta.updateTag({ name: 'og:type', content: 'website'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `${this.event.header_image_path ? this.event.header_image_path : this.community.logo_path}`
      });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.event.name} | Live` });
    this.meta.updateTag({ name: 'twitter:description', content: `${this.event.description.replace(/<[^>]*>/g, '')}`});
  }

  ngOnDestroy() {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


  ngOnInit() {
    this.document.onfullscreenchange = (event) => {
      if (!this.document.fullscreenElement) {
        this.isFullscreen = false;
      }
    }

    this.resolveData();
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
          this.getMyRoles();
        }
      )
    );

    this.subscriptions.push(
      this.userVisitsService.visitors$.subscribe(
        data => {
          this.userVisitData = data;
        }
      )
    );

  }

  ngAfterViewInit() {
    this.onResize();
    if (this.isBrowser) {
      this.nbSidebarService.collapse('mainMenu');
    }

  }

  getMyRoles() {
    if (this.currentUser && this.community) {
      this.usersService.getMyRoles('Kommunity', this.community.id).subscribe(
        data => {
          this.userRoles = data;
        }
      )
    }
  }

  resolveData() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe(
        data => {
          this.community = data.community;
          this.getMyRoles();
          this.event = data.event;
          this.setMeta();
          this.startTime = this.event.start_time;
          this.endTime = this.event.end_time;
          if (this.event.custom_agenda) {
            this.activatedRoute.queryParams.subscribe(
              params => {
                this.getTrackSlot(params.track_slot_id);
                this.pollableId = params.track_slot_id;
                this.pollableType = 'TrackSlot';
              }
            );
          } else {
            this.getEventEmbeddedVideoStream();
            this.getDiscussionQnA();
            this.getDiscussionChat();
            this.title.setTitle(`Live Session | ${this.event.name}`);
            this.pollableId = this.event.id;
            this.pollableType = 'Event';
          }
        }
      )
    );
  }

  getTrackSlot(trackSlotId) {
    this.trackSlotsService.pGetTrackSlot(trackSlotId).subscribe(
      data => {
        this.trackSlot = data;
        this.getDiscussionQnA();
        this.getDiscussionChat();
        this.speaker = data.user;
        this.startTime = this.trackSlot.start_time;
        this.endTime = this.trackSlot.end_time;
        if (this.trackSlot.embedded_video_stream) {
          this.embeddedVideoStream = this.trackSlot.embedded_video_stream;
          this.markUserObjectVisit('TrackSlot', this.trackSlot.id);
          this.onResize();
        }

        if (this.speaker) {
          this.title.setTitle(`${this.speaker.name} | ${this.trackSlot.session_title}`);
          this.meta.updateTag({ name: 'og:title', content: `${this.speaker.name} | ${this.trackSlot.session_title}` });
          this.meta.updateTag({ name: 'twitter:title', content: `${this.speaker.name} | ${this.trackSlot.session_title}` });
        } else {
          this.title.setTitle(`${this.trackSlot.session_title}`);
          this.meta.updateTag({ name: 'og:title', content: `${this.trackSlot.session_title}` });
          this.meta.updateTag({ name: 'twitter:title', content: `${this.trackSlot.session_title}` });


        }
      }
    );
  }

  getDiscussionQnA() {
    if (this.trackSlot) {
      this.discussionsService.pGetOrCreateQnAForTrackSlot(this.trackSlot.id).subscribe(
        data => {
          this.discussion = data;
        }
      );
    } else {
      this.discussionsService.pGetOrCreateQnAForEvent(this.event.id).subscribe(
        data => {
          this.discussion = data;
        }
      );
    }

  }


  getDiscussionChat() {
    if (this.trackSlot) {
      this.discussionsService.pGetOrCreateChatForTrackSlot(this.trackSlot.id).subscribe(
        data => {
          this.chat = data;
        }
      );
    } else {
      this.discussionsService.pGetOrCreateForEventChat(this.event.id).subscribe(
        data => {
          this.chat = data;
        }
      );
    }

  }

  getEventEmbeddedVideoStream() {
    this.embeddedVideoStreamsService.pGet('Event', this.event.id).subscribe(
      data => {
        if (data) {
          this.embeddedVideoStream = data;
          this.markUserObjectVisit('EmbeddedVideoStream', this.embeddedVideoStream.id);
          this.onResize();
        }
      }
    );
  }

  // @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth <= 1000) {
      this.playerWidth = window.innerWidth - 20;
      this.playerHeight = (this.playerWidth as number) / 1.78;
    } else {
      this.playerWidth = this.videoContainer.nativeElement.offsetWidth - 20;
      this.playerHeight = this.videoContainer.nativeElement.offsetHeight - 25;
    }
  }


  tabUpdate(tab, type) {
    switch (type) {
      case 'new': {
        switch (tab) {
          case 'chat':
            if (this.currentTab !== 'chat') {
              this.chatCount += 1;
            }
            break;
          case 'qna':
            if (this.currentTab !== 'qna') {
              this.questionCount += 1;
            }
            break;
        }
        break;
      }
      case 'open': {
        switch (tab) {
          case 'chat':
            this.chatCount = 0;
            break;
          case 'qna':
            this.questionCount = 0;
            break;
        }
        break;
      }
    }

  }

  markUserObjectVisit(objectType, objectId) {
    if (this.isBrowser) {
      const userObjectVisit = {
        url: this.location.path(),
        session_token: this.cookieService.get(environment.session_cookie_name),
        parent_type: objectType,
        parent_id: objectId,
        app_token: this.authWatchService.getAppToken()
      };
      this.userObjectVisitsService.create(userObjectVisit).subscribe();
    }

  }


  toggleFullScreen(element) {
    if (!this.isFullscreen && !this.document.fullscreenElement) {
      if (this.document.body.requestFullscreen) {
        this.document.body.requestFullscreen();
        this.isFullscreen = true;
      }
    } else if (this.document.fullscreenElement) {
      this.document.exitFullscreen();
      this.isFullscreen = false;
    }
  }


  toggleSidebar() {
    this.sidebarMinimize = !this.sidebarMinimize;
  }



}
