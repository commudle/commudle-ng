import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VoteChannel } from '@commudle/shared-channels';
import { AuthService, CableService, VoteService } from '@commudle/shared-services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'commudle-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteComponent implements OnInit, OnDestroy {
  @Input() votableType!: string;
  @Input() votableId!: number;

  voteChannel!: VoteChannel;

  vote$ = new BehaviorSubject<{ total: number; voted: boolean }>({ total: 0, voted: false });
  permittedActions$ = new BehaviorSubject<string[]>([]);

  constructor(private cableService: CableService, private voteService: VoteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.voteService.pGetVotesCount(this.votableType, this.votableId).subscribe((data) => this.vote$.next(data));

    this.voteChannel = new VoteChannel({ votable_type: this.votableType, votable_id: this.votableId });
    this.cableService.subscribe(this.voteChannel);

    this.handleVoteChannel();
  }

  ngOnDestroy(): void {
    this.voteChannel.disconnect();
  }

  toggleVote() {
    if (!this.permittedActions$.value.includes('toggle_vote') || this.permittedActions$.value.includes('blocked')) {
      return;
    }

    this.voteChannel.toggleVote(this.votableType, this.votableId);
  }

  handleVoteChannel() {
    this.voteChannel.on('message', (data) => {
      switch (data.action) {
        case 'set_permissions':
          this.permittedActions$.next(data.permitted_actions);
          break;
        case 'toggle_vote':
          this.vote$.next({
            total: this.vote$.value.total + (data.increment ? 1 : -1),
            voted:
              data.user_id === this.authService.getCurrentUser()?.id ? !this.vote$.value.voted : this.vote$.value.voted,
          });
          break;
        default:
          break;
      }
    });
  }
}
