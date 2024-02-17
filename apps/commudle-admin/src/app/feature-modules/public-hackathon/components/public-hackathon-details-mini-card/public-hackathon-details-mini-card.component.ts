import { Component, Input, OnInit } from '@angular/core';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
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
  hrgId: number;

  constructor(private hrgService: HackathonResponseGroupService) {}

  ngOnInit() {
    this.hrgService.showHackathonResponseGroup(this.hackathon.id).subscribe((data) => {
      this.hrgId = data.id;
    });
  }
}
