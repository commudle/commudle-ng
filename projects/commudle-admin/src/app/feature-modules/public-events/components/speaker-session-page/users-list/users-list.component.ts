import { IEvent } from 'projects/shared-models/event.model';
import { IUser } from 'projects/shared-models/user.model';
import { Component, Input, OnInit, OnDestroy, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { UserObjectVisitChannel } from 'projects/commudle-admin/src/app/services/websockets/user-object-visit.channel';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  uuid = uuidv4();
  @Input() embeddedVideoStream: IEmbeddedVideoStream
  @Input() event: IEvent;
  @Input() isAdmin = false;
  @Input() activeEvent;
  @Output() userCount = new EventEmitter();
  channelName;
  subscriptions = [];
  usersListSubscription;

  usersList: IUser[] = [];

  pingInterval;

  constructor(
    private userObjectVisitChannel: UserObjectVisitChannel,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) { }

  ngOnInit(): void {
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
        this.userObjectVisitChannel.channelConnectionStatus$[this.channelName].subscribe(
          data => {
            if (data) {
              this.getCurrentUsersList();
            }
          }
        )
      )
    }
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }

    this.userObjectVisitChannel.unsubscribe(this.embeddedVideoStream.id, 'EmbeddedVideoStream', this.uuid);
    if (this.usersListSubscription) {
      this.usersListSubscription.unsubscribe();
    }
  }


  getPastUsersList() {
    this.eventsService.embeddedVideoStreamPastVisitors(this.event.slug, this.embeddedVideoStream.id).subscribe(
      data => {
        this.usersList = data.users;
        this.userCount.emit(this.usersList.length);
      }
    );
  }

  getCurrentUsersList() {
    // this.userObjectVisitChannel.sendData(
    //   this.embeddedVideoStream.id,
    //   'EmbeddedVideoStream',
    //   this.uuid,
    //   this.userObjectVisitChannel.ACTIONS.CURRENT_USERS
    // )
  }

  clientPings() {
    if (this.isBrowser) {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }


      this.pingInterval = setInterval(() => {
        this.userObjectVisitChannel.sendData(this.embeddedVideoStream.id,
          'EmbeddedVideoStream',
          this.uuid,
          this.userObjectVisitChannel.ACTIONS.PING)
      }, 5000);
    }

  }

  receiveData() {
    this.subscriptions.push(
      this.userObjectVisitChannel.channelsList$.subscribe(
        data => {
          if (data.has(this.channelName) && !this.usersListSubscription) {
            this.usersListSubscription = this.userObjectVisitChannel.channelData$[this.channelName].subscribe(
              data => {
                if (data) {
                  switch (data.action) {
                    case (this.userObjectVisitChannel.ACTIONS.SET_PERMISSIONS): {
                      // nothing needs to be done here
                      break;
                    }
                    case (this.userObjectVisitChannel.ACTIONS.USER_ADD): {
                      const existingUserIndex = this.usersList.findIndex(k => k.id === data.user.id);
                      if (existingUserIndex === -1 && this.usersList.length > 0) {
                        this.usersList.push(data.user);
                      }
                      break;
                    }
                    case (this.userObjectVisitChannel.ACTIONS.USER_REMOVE): {
                      const existingUserIndex = this.usersList.findIndex(k => k.id === data.user_id);
                      if (existingUserIndex !== -1) {
                        this.usersList.splice(existingUserIndex, 1);
                      }
                      break;
                    }
                  }
                  this.userCount.emit(this.usersList.length);
                }
              }
            );
            this.subscriptions.push(this.usersListSubscription);
          }
        },
      )
    );
  }



  inviteToStage(userId) {
    this.eventsService.inviteGuestToWebinarStage(userId, this.embeddedVideoStream.hms_room_id).subscribe(
      data => {
        this.toastLogService.successDialog('Invited, they will now see a popup', 2000);
      }
    )
  }

}
