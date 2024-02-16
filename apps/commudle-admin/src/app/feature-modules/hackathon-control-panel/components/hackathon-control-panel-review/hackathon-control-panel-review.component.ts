import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';
import {
  EHackathonRegistrationStatus,
  EHackathonRegistrationStatusColor,
} from 'apps/shared-models/hackathon-team.model';
import * as moment from 'moment';
import { RoundService, ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { EDbModels, IRound } from '@commudle/shared-models';

@Component({
  selector: 'commudle-hackathon-control-panel-review',
  templateUrl: './hackathon-control-panel-review.component.html',
  styleUrls: ['./hackathon-control-panel-review.component.scss'],
})
export class HackathonControlPanelReviewComponent implements OnInit {
  userResponses: IHackathonUserResponses[];

  moment = moment;
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  EHackathonRegistrationStatusColor = EHackathonRegistrationStatusColor;
  hackathonRounds: IRound[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    private nbDialogService: NbDialogService,
    private roundService: RoundService,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.fetchUserResponses(params.get('hackathon_id'));
      this.indexRounds(params.get('hackathon_id'));
    });
  }

  fetchUserResponses(hackathonId) {
    this.hackathonService.indexUserResponses(hackathonId).subscribe((data: IHackathonUserResponses[]) => {
      this.userResponses = data;
    });
  }

  optionChanged(event, teamId, index) {
    const value = event.target ? event.target.value : event;
    this.hackathonService.changeTeamStatus(teamId, value).subscribe((data) => {
      this.userResponses[index].team.round = data.round;
    });
  }

  indexRounds(hackathonId) {
    this.roundService.indexRounds(hackathonId, EDbModels.HACKATHON).subscribe((data: IRound[]) => {
      this.hackathonRounds = data;
    });
  }

  openDialogBox(dialog, teamId, index) {
    this.hackathonService.showUserResponsesByTeam(teamId).subscribe((data: IHackathonUserResponses) => {
      const team = data.team;
      this.nbDialogService.open(dialog, {
        context: { team: team, index: index },
      });
    });
  }
  changeRoundOption(event, teamId, index) {
    this.hackathonService.changeTeamRound(teamId, event.target.value).subscribe((data) => {
      this.userResponses[index].team.round = data.round;
    });
  }
}
