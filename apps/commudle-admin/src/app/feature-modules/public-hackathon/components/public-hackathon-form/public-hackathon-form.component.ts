import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { IHackathon, EParticipateTypes } from 'apps/shared-models/hackathon.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
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
  userForm: FormGroup;
  teammateForm: FormGroup;
  subscriptions: Subscription[] = [];
  currentUser: ICurrentUser;
  hackathonUserResponse: IHackathonUserResponse;
  constructor(
    private hrgService: HackathonResponseGroupService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private fb: FormBuilder,
    private authWatchService: LibAuthwatchService,
    private hurService: HackathonUserResponsesService,
  ) {
    this.teammateForm = this.fb.group({
      name: ['', Validators.required],
      teammates: this.fb.array([]) as FormArray,
    });
  }

  get teammatesArray() {
    return this.teammateForm.get('teammates') as FormArray;
  }

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
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),
    );
  }

  fetchPreExistingFormResponse() {
    this.hurService
      .getExistingHackathonUserResponses(this.hackathonResponseGroup.id)
      .subscribe((data: IHackathonUserResponse[]) => {
        if (data) {
          this.hackathonUserResponse = data[0];
          this.userForm = this.createForm(this.hackathonResponseGroup.user_details);
          this.fetchTeamDetails();
        } else {
          this.addTeammate();
        }
      });
  }

  fetchTeamDetails() {
    this.hurService.getTeamDetails(this.hackathonUserResponse.id).subscribe((data) => {
      if (data) {
        this.teammateForm.patchValue({ name: data.team_name });
        for (const teamDetail of data.teammates_details) {
          this.addTeammate(teamDetail.user_email, teamDetail.tshirt_size);
        }
      }
    });
  }

  createForm(userDetails: any): FormGroup {
    const formGroupConfig: any = {};

    // Dynamically add form controls based on configuration
    Object.keys(userDetails).forEach((key) => {
      if (userDetails[key]) {
        formGroupConfig[key] = [
          this.hackathonUserResponse ? this.hackathonUserResponse[key] : this.currentUser[key],
          Validators.required,
        ];
      }
    });

    return this.fb.group(formGroupConfig);
  }

  submitUserResponse() {
    this.hurService
      .createHackathonResponseGroup(this.userForm.value, this.hackathonResponseGroup.id)
      .subscribe((data) => {
        this.hackathonUserResponse = data;
      });
  }

  updateUserResponse() {
    this.hurService
      .updateHackathonResponseGroup(this.userForm.value, this.hackathonUserResponse.id)
      .subscribe((data) => {
        this.hackathonUserResponse = data;
      });
  }

  addTeammate(email = '', tshirt_size = '') {
    const teammateGroup = this.fb.group({
      email: [email, [Validators.required, Validators.email]],
      tshirt_size: [tshirt_size, Validators.required],
    });

    this.teammatesArray.push(teammateGroup);
  }

  removeTeammate(index: number) {
    this.teammatesArray.removeAt(index);
  }

  submitTeammateDetails() {
    this.hurService.updateTeamDetails(this.teammateForm.value, this.hackathonUserResponse.id).subscribe((data) => {});
  }
}
