import { Component, Input, OnInit } from '@angular/core';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-admin-hackathon',
  templateUrl: './admin-hackathon.component.html',
  styleUrls: ['./admin-hackathon.component.scss'],
})
export class AdminHackathonComponent implements OnInit {
  @Input() parentId: number | string;
  @Input() parentType: 'Kommunity' | 'CommunityGroup';

  hackathons: IHackathon[];
  subscriptions: Subscription[] = [];

  moment = moment;
  icons = {
    faPlus,
  };

  constructor(private hackathonService: HackathonService) {}

  ngOnInit() {
    this.getHackathons();
  }

  getHackathons() {
    this.subscriptions.push(
      this.hackathonService.indexHackathons(this.parentId, this.parentType).subscribe((data) => {
        this.hackathons = data;
      }),
    );
  }
}
