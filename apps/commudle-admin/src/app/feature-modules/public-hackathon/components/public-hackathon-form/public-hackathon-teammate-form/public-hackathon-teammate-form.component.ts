import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';

@Component({
  selector: 'commudle-public-hackathon-teammate-form',
  templateUrl: './public-hackathon-teammate-form.component.html',
  styleUrls: ['./public-hackathon-teammate-form.component.scss'],
})
export class PublicHackathonTeammateFormComponent implements OnInit {
  @Input() hackathonUserResponse: IHackathonUserResponse;

  teammateForm: FormGroup;

  @Output() submitTeammateDetailsEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private hurService: HackathonUserResponsesService) {
    this.teammateForm = this.fb.group({
      name: ['', Validators.required],
      teammates: this.fb.array([]) as FormArray,
    });
  }

  ngOnInit(): void {
    if (this.hackathonUserResponse && this.hackathonUserResponse.hackathon_team_id) {
      this.fetchTeamDetails();
    } else {
      this.addTeammate();
    }
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

  get teammatesArray() {
    return this.teammateForm.get('teammates') as FormArray;
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

  submitTeammateDetails() {
    this.submitTeammateDetailsEvent.emit(this.teammateForm.value);
  }
}
