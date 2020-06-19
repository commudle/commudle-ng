import { Component, OnInit, Input } from '@angular/core';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { PollsChannel } from '../services/websockets/polls.channel';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  @Input() pollableId: number;
  @Input() pollableType: string;

  currentUser: ICurrentUser;
  allActions;

  constructor(
    private pollsChannel: PollsChannel,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService
  ) { }


  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(
      user => this.currentUser = user
    );

    this.pollsChannel.subscribe(this.pollableType, this.pollableId);
    this.allActions = this.pollsChannel.ACTIONS;
    this.receiveData();
  }

  receiveData() {
  }

}
