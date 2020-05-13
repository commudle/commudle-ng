import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { ActionCableConnectionSocket } from '../../../../../shared-services/action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';


@Injectable({
  providedIn: 'root'
})
export class TrackSlotQuestionsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    ADD: 'add',
    VOTE: 'vote',
    FLAG: 'flag',
    DELETE: 'delete'
  };

  actionCable = actionCable;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe(discussionId) {
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.subscription = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.TRACK_SLOT_DISCUSSION,
            room: discussionId
          }, {
            received: (data) => {
              console.log(data);
              this.channelData.next(data);
            }
          });
        }
      }
    );
  }


  // sendQuestion(messageContent) {
  //   this.subscription.send({
  //     perform: this.ACTIONS.ADD,
  //     user_message: {
  //       content: messageContent
  //     }
  //   });
  // }

  sendData(action, data) {
    this.subscription.send({
      perform: action,
      data
    });
  }



  unsubscribe() {
    this.subscription.unsubscribe();
  }

}
