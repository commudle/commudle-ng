import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';

@Component({
  selector: 'commudle-hackathon-control-panel-registrations',
  templateUrl: './hackathon-control-panel-registrations.component.html',
  styleUrls: ['./hackathon-control-panel-registrations.component.scss'],
})
export class HackathonControlPanelRegistrationsComponent implements OnInit {
  userDetailsForm: FormGroup;
  registrationTypeId = 1;
  constructor(private fb: FormBuilder, private hrgService: HackathonResponseGroupService) {
    this.userDetailsForm = this.fb.group({
      name: false,
      designation: false,
      about: false,
      location: false,
      work_experience: false,
      education: false,
      phone_number: false,
      email: false,
      twitter: false,
      linkedin: false,
      dribbble: false,
      youtube: false,
      medium: false,
      behance: false,
      gitlab: false,
      github: false,
      facebook: false,
      tshirt_size: false,
    });
  }

  ngOnInit() {
    this.hrgService.showHackathon(1).subscribe((data: IHackathonResponseGroup) => {
      if (data) {
        this.userDetailsForm.patchValue({
          name: data.user_details.name,
          designation: data.user_details.designation,
          about: data.user_details.about,
          location: data.user_details.location,
          work_experience: data.user_details.work_experience,
          education: data.user_details.education,
          phone_number: data.user_details.phone_number,
          email: data.user_details.email,
          twitter: data.user_details.twitter,
          linkedin: data.user_details.linkedin,
          dribbble: data.user_details.dribbble,
          youtube: data.user_details.youtube,
          medium: data.user_details.medium,
          behance: data.user_details.behance,
          gitlab: data.user_details.gitlab,
          github: data.user_details.github,
          facebook: data.user_details.facebook,
          tshirt_size: data.user_details.tshirt_size,
        });
      }
    });
  }

  submit(formResponse) {
    console.log('🚀 ~ HackathonControlPanelRegistrationsComponent ~ submit ~ formResponse:', formResponse);
    this.hrgService
      .createHackathonResponseGroup(
        JSON.stringify(this.userDetailsForm.value),
        1,
        this.registrationTypeId,
        formResponse.name,
      )
      .subscribe((data) => {
        console.log(
          '🚀 ~ HackathonControlPanelRegistrationsComponent ~ this.hrgService.createHackathonResponseGroup ~ data:',
          data,
        );
      });
  }

  // createAndSelectForm(event) {}
}
