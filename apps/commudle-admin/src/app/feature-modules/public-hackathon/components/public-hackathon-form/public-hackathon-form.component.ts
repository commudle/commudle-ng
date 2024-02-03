import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbStepperComponent } from '@commudle/theme';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { IHackathon, EParticipateTypes } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-hackathon-form',
  templateUrl: './public-hackathon-form.component.html',
  styleUrls: ['./public-hackathon-form.component.scss'],
})
export class PublicHackathonFormComponent implements OnInit {
  hackathon: IHackathon;
  showTeammateForm = false;
  hackathonResponseGroup: IHackathonResponseGroup;
  subscriptions: Subscription[] = [];
  hackathonUserResponse: IHackathonUserResponse;
  @ViewChild('stepper') stepper: NbStepperComponent;
  isLoading = true;

  constructor(
    private hrgService: HackathonResponseGroupService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private hurService: HackathonUserResponsesService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.hrgService
        .pShowHackathonResponseGroup(this.activatedRoute.snapshot.params['hackathon_response_group_id'])
        .subscribe((data: IHackathonResponseGroup) => {
          this.hackathonResponseGroup = data;
          this.fetchPreExistingFormResponse();

          this.hackathonService.showHackathon(this.hackathonResponseGroup.hackathon_id).subscribe((data) => {
            this.hackathon = data;
            if (
              this.hackathon.participate_types === EParticipateTypes.BOTH ||
              this.hackathon.participate_types === EParticipateTypes.TEAM
            ) {
              this.showTeammateForm = true;
            }
          });
        }),
    );
  }

  fetchPreExistingFormResponse() {
    this.hurService
      .getExistingHackathonUserResponses(this.hackathonResponseGroup.id)
      .subscribe((data: IHackathonUserResponse[]) => {
        if (data) {
          this.hackathonUserResponse = data[0];
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  }

  submitUserResponse(formData) {
    this.hurService.createHackathonResponseGroup(formData, this.hackathonResponseGroup.id).subscribe((data) => {
      this.hackathonUserResponse = data;
      this.stepper.next();
    });
  }

  updateUserResponse(formData) {
    this.hurService.updateHackathonResponseGroup(formData, this.hackathonUserResponse.id).subscribe((data) => {
      this.hackathonUserResponse = data;
      this.stepper.next();
    });
  }

  submitTeammateDetails(formData) {
    this.hurService.updateTeamDetails(formData, this.hackathonUserResponse.id).subscribe((data) => {
      if (data) this.stepper.next();
    });
  }

  submitProjectDetails(formData) {
    this.hurService.updateProjectDetails(formData, this.hackathonUserResponse.id).subscribe((data) => {
      if (data) this.stepper.next();
    });
  }
}
