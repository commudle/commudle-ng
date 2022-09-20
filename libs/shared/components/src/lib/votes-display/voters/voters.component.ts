import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser } from '@commudle/shared-models';
import { NbWindowService } from '@nebular/theme';
import { SVotesService } from '../../services/s-votes.service';

@Component({
  selector: 'commudle-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss'],
})
export class VotersComponent implements OnInit {
  @ViewChild('votersList') votersList: TemplateRef<any>;

  @Input() votableType;
  @Input() votableId;

  page = 1;
  count = 10;
  total;
  isLoading = false;

  voters: IUser[] = [];

  constructor(private votesService: SVotesService, private windowService: NbWindowService) {}

  ngOnInit() {
    this.getVoters();
  }

  getVoters() {
    if (!this.isLoading) {
      this.votesService.pGetVoters(this.votableType, this.votableId, this.page, this.count).subscribe((data) => {
        this.voters = this.voters.concat(data.users);
        this.total = data.total;
        this.page += 1;
        this.isLoading = true;
      });
    }
  }

  openWindow() {
    this.getVoters();
    this.windowService.open(this.votersList);
  }
}
