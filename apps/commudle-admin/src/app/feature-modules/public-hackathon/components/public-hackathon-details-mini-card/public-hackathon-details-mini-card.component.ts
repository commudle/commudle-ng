import { Component, Input, OnInit } from '@angular/core';
import { IHackathonTeam } from 'apps/shared-models/hackathon-team.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-public-hackathon-details-mini-card',
  templateUrl: './public-hackathon-details-mini-card.component.html',
  styleUrls: ['./public-hackathon-details-mini-card.component.scss'],
})
export class PublicHackathonDetailsMiniCardComponent implements OnInit {
  @Input() hackathon: IHackathon;
  @Input() userTeamDetails: IHackathonTeam;
  @Input() hrgId: number;

  constructor() {}

  ngOnInit() {}
}
