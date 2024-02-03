import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'commudle-public-hackathon-user-details-form',
  templateUrl: './public-hackathon-user-details-form.component.html',
  styleUrls: ['./public-hackathon-user-details-form.component.scss'],
})
export class PublicHackathonUserDetailsFormComponent implements OnInit {
  @Input() hackathonResponseGroup: IHackathonResponseGroup;
  @Input() hackathonUserResponse: IHackathonUserResponse;
  @Output() submitUserDetailsEvent = new EventEmitter<any>();

  currentUser: ICurrentUser;
  userForm: FormGroup;

  constructor(private authWatchService: LibAuthwatchService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      this.hackathonUserResponse;
      this.userForm = this.createForm(this.hackathonResponseGroup.user_details);
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

  submitUserDetails() {
    this.submitUserDetailsEvent.emit(this.userForm.value);
  }
}
