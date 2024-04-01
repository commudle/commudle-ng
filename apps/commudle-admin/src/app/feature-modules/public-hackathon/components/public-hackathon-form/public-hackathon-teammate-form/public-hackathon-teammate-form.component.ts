import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { faUserLargeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';

@Component({
  selector: 'commudle-public-hackathon-teammate-form',
  templateUrl: './public-hackathon-teammate-form.component.html',
  styleUrls: ['./public-hackathon-teammate-form.component.scss'],
})
export class PublicHackathonTeammateFormComponent implements OnInit, AfterViewInit {
  @Input() hackathonUserResponse: IHackathonUserResponse;
  @Input() hackathonResponseGroup: IHackathonResponseGroup;
  @Input() hasTeammateOption: boolean;
  @Output() submitTeammateDetailsEvent = new EventEmitter<any>();
  @Output() previousButtonEvent = new EventEmitter<any>();
  showEmailError = false;
  teammateForm: FormGroup;
  currentUser: ICurrentUser;

  icons = {
    faUserLargeSlash,
    faPlus,
  };

  constructor(
    private fb: FormBuilder,
    private hurService: HackathonUserResponsesService,
    private authWatchService: LibAuthwatchService,
  ) {
    this.teammateForm = this.fb.group({
      name: ['', Validators.required],
      teammates: this.fb.array([]) as FormArray,
    });
  }

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      if (!this.hasTeammateOption) {
        this.teammateForm.patchValue({
          name: this.currentUser.name,
        });
      }
    });
  }

  ngAfterViewInit() {
    if (this.hackathonUserResponse && this.hackathonUserResponse.hackathon_team_id) {
      this.fetchTeamDetails();
    }
  }

  checkEmail(email) {
    if (email.value.includes(this.currentUser.email)) {
      this.showEmailError = true;
    } else {
      this.showEmailError = false;
    }
  }

  addTeammate(email = '', tshirt_size = '') {
    let teammateGroup;
    if (this.hackathonResponseGroup.user_details.tshirt_size) {
      teammateGroup = this.fb.group({
        email: [email, [Validators.required, Validators.email]],
        tshirt_size: [tshirt_size, Validators.required],
      });
    } else {
      teammateGroup = this.fb.group({
        email: [email, [Validators.required, Validators.email]],
      });
    }

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

  previousButton() {
    this.previousButtonEvent.emit();
  }
}
