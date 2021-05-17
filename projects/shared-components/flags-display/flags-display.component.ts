import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { FlagChannel } from '../services/websockets/flag.channel';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SFlagsService } from '../services/s-flags.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-flags-display',
  templateUrl: './flags-display.component.html',
  styleUrls: ['./flags-display.component.scss']
})
export class FlagsDisplayComponent implements OnInit, OnDestroy {
  @Input() flaggableType: string;
  @Input() flaggableId: number;
  @Input() flagType: string;
  @Input() size;

  uuid = uuidv4();


  userSubscription;
  flagsChannelSubscription;
  flagsChannelListSubscription: Subscription;
  flagsChannelDataSubscription: Subscription;
  currentUser: ICurrentUser;
  permittedActions = [];

  myFlag = false;
  flagingChannelSubscription;
  totalFlags = 0;


  page: 1;
  count: 10;


  constructor(
    private authWatchService: LibAuthwatchService,
    private flagChannel: FlagChannel,
    private flagsService: SFlagsService,
    private toastLogService: LibToastLogService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authWatchService.currentUser$.subscribe(
      data => {
        this.currentUser = data;
        this.initData();
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    if (this.flagsChannelDataSubscription) {
      this.flagsChannelDataSubscription.unsubscribe();
    }
    this.flagChannel.unsubscribe(this.flaggableType, this.flaggableId, this.uuid);
  }

  initData() {
    this.getAllFlags();
    if (this.flagsChannelSubscription) {
      this.flagsChannelDataSubscription.unsubscribe();
      this.flagChannel.unsubscribe(this.flaggableType, this.flaggableId, this.uuid);
    }
    this.flagsChannelSubscription = this.flagChannel.subscribe(this.flaggableType, this.flaggableId, this.uuid);
    this.receiveData();
  }


  getAllFlags() {
    this.flagsService.pGetFlagsCount(this.flaggableType, this.flaggableId).subscribe(
      data => {
        this.totalFlags = data.total;
        this.myFlag = data.flagged;
      }
    );
  }


  toggleFlag() {
    if (this.currentUser) {
      this.flagChannel.sendData(
        this.flaggableType, this.flaggableId,
        this.uuid,
        this.flagChannel.ACTIONS.TOGGLE_FLAG,
        {}
      );
    } else {
      this.authWatchService.logInUser();
    }

  }


  receiveData() {
    this.flagsChannelListSubscription = this.flagChannel.channelsList$.subscribe(
      data => {
        if (data.has(`${this.flaggableId}_${this.flaggableType}_${this.uuid}`) && !this.flagsChannelDataSubscription) {
          this.flagsChannelDataSubscription = this.flagChannel.channelData$[`${this.flaggableId}_${this.flaggableType}_${this.uuid}`].subscribe(
            data => {
              if (data) {
                switch (data.action) {
                  case (this.flagChannel.ACTIONS.SET_PERMISSIONS): {
                    this.permittedActions = data.permitted_actions;
                    break;
                  }
                  case (this.flagChannel.ACTIONS.TOGGLE_FLAG): {
                    data.increment ? (this.totalFlags += 1) : (this.totalFlags -= 1);
                    this.myFlag = (data.increment && data.user_id === this.currentUser.id) ? true : false;
                    break;
                  }
                  case (this.flagChannel.ACTIONS.ERROR): {
                    this.toastLogService.warningDialog(data.message, 2000);
                  }
                }
              }
            }
          );
        }
      },
    );
  }


}
