import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChalkboardTeacher, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { UserChatsService } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { UserObjectVisitChannel } from 'apps/commudle-admin/src/app/services/websockets/user-object-visit.channel';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IEmbeddedVideoStream } from 'apps/shared-models/embedded_video_stream.model';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { HmsStageService } from 'apps/shared-modules/hms-video/services/hms-stage.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-session-page-viewers',
  templateUrl: './session-page-viewers.component.html',
  styleUrls: ['./session-page-viewers.component.scss'],
})
export class SessionPageViewersComponent implements OnInit, OnDestroy {
  uuid = uuidv4();

  @Input() embeddedVideoStream: IEmbeddedVideoStream;
  @Input() event: IEvent;
  @Input() isAdmin = false;
  @Input() activeEvent;
  @Output() userCount = new EventEmitter();

  channelName: string;
  subscriptions: Subscription[] = [];
  usersListSubscription: Subscription;
  usersList: IUser[] = [];
  currentUser: ICurrentUser;
  pingInterval;
  searchQuery: string;

  faChalkboardTeacher = faChalkboardTeacher;
  faCommentDots = faCommentDots;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private userObjectVisitChannel: UserObjectVisitChannel,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
    @Inject(PLATFORM_ID) private platformId: object,
    private hmsStageService: HmsStageService,
    private userChatsService: UserChatsService,
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.channelName = `${this.embeddedVideoStream.id}_EmbeddedVideoStream_${this.uuid}`;
      if (this.event.event_status.name === EEventStatuses.COMPLETED) {
        this.getPastUsersList();
      } else {
        let parentType = 'EmbeddedVideoStream';
        let parentId = this.embeddedVideoStream.id;

        if (this.activatedRoute.snapshot.queryParams.track_slot_id) {
          parentType = 'TrackSlot';
          parentId = this.activatedRoute.snapshot.queryParams.track_slot_id;
        }
        this.userObjectVisitChannel.subscribe(parentId, parentType, this.uuid);
        this.receiveData();
        this.clientPings();

        this.subscriptions.push(
          this.userObjectVisitChannel.channelConnectionStatus$[this.channelName].subscribe((data) => {
            if (data) {
              this.getCurrentUsersList();
            }
          }),
          this.authWatchService.currentUser$.subscribe((currentUser) => {
            if (currentUser) {
              this.currentUser = currentUser;
            }
          }),
        );
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => value.unsubscribe());

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }

    this.userObjectVisitChannel.unsubscribe(this.embeddedVideoStream.id, 'EmbeddedVideoStream', this.uuid);
    if (this.usersListSubscription) {
      this.usersListSubscription.unsubscribe();
    }
  }

  getPastUsersList() {
    this.eventsService
      .embeddedVideoStreamPastVisitors(this.event.slug, this.embeddedVideoStream.id)
      .subscribe((data) => {
        this.usersList = data.users;
        this.userCount.emit(this.usersList.length);
      });
  }

  getCurrentUsersList() {
    this.eventsService.embeddedVideoStreamVisitors(this.event.slug, this.embeddedVideoStream.id).subscribe((data) => {
      this.usersList = data.users;
      this.userCount.emit(this.usersList.length);
    });
  }

  clientPings() {
    if (this.isBrowser) {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }

      this.pingInterval = setInterval(() => {
        this.userObjectVisitChannel.sendData(
          this.embeddedVideoStream.id,
          'EmbeddedVideoStream',
          this.uuid,
          this.userObjectVisitChannel.ACTIONS.PING,
        );
      }, 30000);
    }
  }

  receiveData() {
    this.subscriptions.push(
      this.userObjectVisitChannel.channelsList$.subscribe((value) => {
        if (value.has(this.channelName) && !this.usersListSubscription) {
          this.usersListSubscription = this.userObjectVisitChannel.channelData$[this.channelName].subscribe((data) => {
            if (data) {
              switch (data.action) {
                case this.userObjectVisitChannel.ACTIONS.SET_PERMISSIONS: {
                  // nothing needs to be done here
                  break;
                }
                case this.userObjectVisitChannel.ACTIONS.USER_ADD: {
                  this.usersList = _.unionBy(this.usersList, [data.user], 'id');
                  break;
                }
                case this.userObjectVisitChannel.ACTIONS.USER_REMOVE: {
                  this.usersList = this.usersList.filter((user: IUser) => user.id !== data.user_id);
                  break;
                }
              }
              this.userCount.emit(this.usersList.length);
            }
          });
          this.subscriptions.push(this.usersListSubscription);
        }
      }),
    );
  }

  inviteToStage(userId) {
    // this.eventsService.inviteGuestToWebinarStage(userId, this.embeddedVideoStream.hms_room_id).subscribe((data) => {
    //   this.toastLogService.successDialog('Invited, they will now see a popup', 2000);
    // });

    this.hmsStageService.inviteToStage(userId);
  }

  refreshUsersList(): void {
    if (this.event.event_status.name === EEventStatuses.COMPLETED) {
      this.getPastUsersList();
    } else {
      this.getCurrentUsersList();
    }
  }

  messageUser(userId) {
    this.userChatsService.changeFollowerId(userId);
  }
}
