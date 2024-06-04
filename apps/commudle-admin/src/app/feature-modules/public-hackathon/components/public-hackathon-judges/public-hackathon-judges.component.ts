import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonJudge } from 'apps/shared-models/hackathon-judge.model';

@Component({
  selector: 'commudle-public-hackathon-judges',
  templateUrl: './public-hackathon-judges.component.html',
  styleUrls: ['./public-hackathon-judges.component.scss'],
})
export class PublicHackathonJudgesComponent implements OnInit {
  subscriptions: Subscription[] = [];
  hackathon: IHackathon;
  hackathonJudges: IHackathonJudge[];
  isLoading = true;
  constructor(private activatedRoute: ActivatedRoute, private hackathonService: HackathonService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.getJudges();
      }),
    );
  }

  getJudges() {
    this.subscriptions.push(
      this.hackathonService.pIndexJudge(this.hackathon.id).subscribe((data) => {
        this.hackathonJudges = data;
        this.isLoading = false;
      }),
    );
  }
}
