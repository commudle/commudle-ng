import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SVotesService } from '../services/s-votes.service';
import { VoteChannel } from '../services/websockets/vote.channel';
import { VotersComponent } from './voters/voters.component';

@Component({
  selector: 'app-votes-display',
  templateUrl: './votes-display.component.html',
  styleUrls: ['./votes-display.component.scss'],
})
export class VotesDisplayComponent implements OnInit, OnDestroy {
  @Input() votableType: string;
  @Input() votableId: number;
  @Input() voteType: string;
  @Input() icon: string;
  @Input() size;
  @Input() canVote: boolean = true;

  @Output() isBlocked: EventEmitter<boolean> = new EventEmitter<boolean>();

  uuid = uuidv4();

  VotersComponent = VotersComponent;

  userSubscription;
  votesChannelSubscription;
  votesChannelListSubscription: Subscription;
  votesChannelDataSubscription: Subscription;
  currentUser: ICurrentUser;
  permittedActions = [];

  myVote = false;
  totalVotes = 0;

  page: 1;
  count: 10;

  constructor(
    private authWatchService: LibAuthwatchService,
    private voteChannel: VoteChannel,
    private votesService: SVotesService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      this.initData();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    if (this.votesChannelDataSubscription) {
      this.votesChannelDataSubscription.unsubscribe();
    }
    this.voteChannel.unsubscribe(this.votableType, this.votableId, this.uuid);
  }

  initData() {
    this.getAllVotes();
    if (this.votesChannelSubscription) {
      this.votesChannelDataSubscription.unsubscribe();
      this.voteChannel.unsubscribe(this.votableType, this.votableId, this.uuid);
    }
    this.votesChannelSubscription = this.voteChannel.subscribe(this.votableType, this.votableId, this.uuid);
    this.receiveData();
  }

  getAllVotes() {
    this.votesService.pGetVotesCount(this.votableType, this.votableId).subscribe((data) => {
      this.totalVotes = data.total;
      this.myVote = data.voted;
    });
  }

  toggleVote() {
    if (this.canVote) {
      if (this.currentUser) {
        this.voteChannel.sendData(
          this.votableType,
          this.votableId,
          this.uuid,
          this.voteChannel.ACTIONS.TOGGLE_VOTE,
          {},
        );
      } else {
        this.authWatchService.logInUser();
      }
    }
  }

  receiveData() {
    this.votesChannelListSubscription = this.voteChannel.channelsList$.subscribe((data) => {
      if (data.has(`${this.votableId}_${this.votableType}_${this.uuid}`) && !this.votesChannelDataSubscription) {
        this.votesChannelDataSubscription = this.voteChannel.channelData$[
          `${this.votableId}_${this.votableType}_${this.uuid}`
        ].subscribe((data) => {
          if (data) {
            switch (data.action) {
              case this.voteChannel.ACTIONS.SET_PERMISSIONS: {
                this.permittedActions = data.permitted_actions;
                if (this.permittedActions.includes(this.voteChannel.ACTIONS.BLOCKED)) {
                  this.isBlocked.emit(true);
                  this.canVote = false;
                }
                break;
              }
              case this.voteChannel.ACTIONS.TOGGLE_VOTE: {
                data.increment ? (this.totalVotes += 1) : (this.totalVotes -= 1);
                this.myVote = data.increment && data.user_id === this.currentUser.id;
                break;
              }
              case this.voteChannel.ACTIONS.ERROR: {
                this.toastLogService.warningDialog(data.message, 2000);
              }
            }
          }
        });
      }
    });
  }
}
