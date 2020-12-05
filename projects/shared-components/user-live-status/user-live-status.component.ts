import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserLiveStatusChannel } from '../services/websockets/user-live-status.channel';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-live-status',
  templateUrl: './user-live-status.component.html',
  styleUrls: ['./user-live-status.component.scss']
})
export class UserLiveStatusComponent implements OnInit, OnDestroy {

  uuid = uuidv4();
  @Input() userId: number;
  @Output() isOnline = new EventEmitter();
  subscriptions = [];
  receiveDataSubscription;

  constructor(
    private userLiveStatusChannel: UserLiveStatusChannel
  ) { }

  ngOnInit(): void {
    // subscribe to the channel with userid
    this.userLiveStatusChannel.subscribe(this.userId, this.uuid);
    this.subscriptions.push(
      this.userLiveStatusChannel.channelsList$.subscribe(
        data => {
          if (data.has(`${this.userId}_${this.uuid}`) && !this.receiveDataSubscription) {
            this.receiveData();
          }
        },
      )
    );
  }


  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.userLiveStatusChannel.unsubscribe(this.userId, this.uuid);
    if (this.receiveDataSubscription) {
      this.receiveDataSubscription.unsubscribe();
    }
  }


  receiveData() {
    this.receiveDataSubscription = this.userLiveStatusChannel.channelData$[`${this.userId}_${this.uuid}`].subscribe(
      data => {
        if (data) {
          switch (data.action) {
            case (this.userLiveStatusChannel.ACTIONS.IS_ONLINE): {
              this.isOnline.emit(true);
              break;
            }
            case (this.userLiveStatusChannel.ACTIONS.IS_OFFLINE): {
              this.isOnline.emit(false);
              break;
            }
          }
        } else {
          this.isOnline.emit(false);
        }
      }
    )

  }

}
