/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnInit } from '@angular/core';
import { EHackathonRegistrationStatus, IHackathonTeam } from 'apps/shared-models/hackathon-team.model';

@Component({
  selector: 'commudle-public-hackathon-registration',
  templateUrl: './public-hackathon-registration.component.html',
  styleUrls: ['./public-hackathon-registration.component.scss'],
})
export class PublicHackathonRegistrationComponent implements OnInit {
  @Input() hrgId: number; // ID of the hackathon response group
  @Input() userTeamDetails: IHackathonTeam;
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;

  constructor() {}

  ngOnInit() {}
}
