import { Component, OnInit, Input } from '@angular/core';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { VoteChannel } from '../services/websockets/vote.channel';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-votes-display',
  templateUrl: './votes-display.component.html',
  styleUrls: ['./votes-display.component.scss']
})
export class VotesDisplayComponent implements OnInit {
  @Input() votableType: string;
  @Input() votableId: number;
  @Input() voteType: string;
  @Input() icon: string;

  currentUser: ICurrentUser;
  permittedActions = [];

  myVote = false;
  votingChannelSubscription;
  totalVotes = 0;


  page: 1;
  count: 10;


  constructor(
    private authWatchService: LibAuthwatchService,
    private voteChannel: VoteChannel,
    private toastLogService: LibToastLogService
  ) {}

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(
      data => this.currentUser = data
    );

    this.voteChannel.subscribe(this.votableType, this.votableId);
    this.receiveData();
  }

  getAllVotes() {

  }


  toggleVote() {
    this.voteChannel.sendData(
      this.votableType, this.votableId,
      this.voteChannel.ACTIONS.TOGGLE_VOTE,
      {}
    );
  }

  receiveData() {
    this.voteChannel.channelData$[`${this.votableId}_${this.votableType}`].subscribe(
      data => {
        if (data) {
          switch (data.action) {
            case (this.voteChannel.ACTIONS.SET_PERMISSIONS): {
              this.permittedActions = data.permitted_actions;
              break;
            }
            case (this.voteChannel.ACTIONS.TOGGLE_VOTE): {
              data.increment ? (this.totalVotes += 1) : (this.totalVotes -= 1);
              break;
            }
            case (this.voteChannel.ACTIONS.ERROR): {
              this.toastLogService.warningDialog(data.message, 2000);
            }
          }
        }
      }
    );
  }


  getVoters() {

  }

}
