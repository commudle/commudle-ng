import {Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserLiveStatusChannel} from '../services/websockets/user-live-status.channel';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'commudle-user-live-status',
  templateUrl: './user-live-status.component.html',
  styleUrls: ['./user-live-status.component.scss']
})
export class UserLiveStatusComponent implements OnInit, OnDestroy {

  uuid = uuidv4();
  @Input() userId: number;
  @Input() position: string;
  @Output() isOnline = new EventEmitter();
  online = false;
  subscriptions = [];
  receiveDataSubscription;

  constructor(
    private userLiveStatusChannel: UserLiveStatusChannel
  ) {
  }

  @HostBinding('class')
  get themeClass() {
    if (this.position) {
      return this.position;
    }
    return '';
  };

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

    if (!this.position) {
      this.position = 'top left';
    }
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
              this.online = true;
              this.isOnline.emit(true);
              break;
            }
            case (this.userLiveStatusChannel.ACTIONS.IS_OFFLINE): {
              this.online = false;
              this.isOnline.emit(false);
              break;
            }
          }
        }
      }
    );
  }

}
