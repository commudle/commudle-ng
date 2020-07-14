import { Component, OnInit, Input } from '@angular/core';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-votes-display',
  templateUrl: './votes-display.component.html',
  styleUrls: ['./votes-display.component.scss']
})
export class VotesDisplayComponent implements OnInit {
  @Input() parentType: string;
  @Input() parentId: number;
  @Input() voteType: string;
  @Input() icon: string;

  currentUser: ICurrentUser;

  myVote = false;
  totalVotes = 0;


  page: 1;
  count: 10;


  constructor(
    private authWatchService: LibAuthwatchService
  ) {}

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(
      data => this.currentUser = data
    );
  }

  getAllVotes() {

  }


  toggleVote() {

  }


  getVoters() {

  }

}
