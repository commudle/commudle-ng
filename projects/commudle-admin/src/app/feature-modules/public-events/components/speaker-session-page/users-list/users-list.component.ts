import { IEvent } from 'projects/shared-models/event.model';
import { IUser } from 'projects/shared-models/user.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserObjectVisitChannel } from 'projects/commudle-admin/src/app/services/websockets/user-object-visit.channel';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  uuid = uuidv4();
  @Input() embeddedVideoStream: IEmbeddedVideoStream
  @Input() event: IEvent;
  channelName;
  subscriptions = [];
  usersListSubscription;

  usersList: IUser[] = [];

  constructor(
    private userObjectVisitChannel: UserObjectVisitChannel,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.channelName = `${this.embeddedVideoStream.id}_EmbeddedVideoStream_${this.uuid}`;
    if (this.event.event_status.name === EEventStatuses.COMPLETED) {
      this.getPastUsersList();
    } else {
      this.userObjectVisitChannel.subscribe(this.embeddedVideoStream.id, 'EmbeddedVideoStream', this.uuid);
      this.receiveData();

      this.userObjectVisitChannel.channelConnectionStatus$[this.channelName].subscribe(
        data => {
          if (data) {
            this.getCurrentUsersList();
          }
        }
      )
    }
  }

  ngOnDestroy() {
    this.userObjectVisitChannel.unsubscribe(this.embeddedVideoStream.id, 'EmbeddedVideoStream', this.uuid);
    this.usersListSubscription.unsubscribe();
  }


  getPastUsersList() {
    this.eventsService.embeddedVideoStreamPastVisitors(this.event.slug, this.embeddedVideoStream.id).subscribe(
      data => {
        this.usersList = data.users;
      }
    );
  }

  getCurrentUsersList() {
    this.userObjectVisitChannel.sendData(
      this.embeddedVideoStream.id,
      'EmbeddedVideoStream',
      this.uuid,
      this.userObjectVisitChannel.ACTIONS.CURRENT_USERS
    )
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
                    case (this.userObjectVisitChannel.ACTIONS.CURRENT_USERS): {
                      this.usersList = data.users;
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

  }

}
