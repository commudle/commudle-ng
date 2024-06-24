import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser } from '@commudle/shared-models';
import { VoteService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';

@Component({
  selector: 'commudle-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss'],
})
export class VotersComponent implements OnInit {
  @Input() votableType;
  @Input() votableId;
  page = 1;
  count = 10;
  total;
  isLoading = true;

  voters: IUser[] = [];

  @ViewChild('votersList') votersList: TemplateRef<any>;

  constructor(private voteService: VoteService, private dialogService: NbDialogService) {}

  ngOnInit() {
    this.getVoters();
  }

  getVoters() {
    this.voteService.pGetVoters(this.votableType, this.votableId, this.page, this.count).subscribe((data) => {
      this.voters = this.voters.concat(data.users);
      this.total = data.total;
      this.page += 1;
      this.isLoading = false;
    });
  }

  openWindow() {
    this.getVoters();
    this.dialogService.open(this.votersList);
  }
}
