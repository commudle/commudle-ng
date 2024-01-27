import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '@commudle/shared-services';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-hackathon-control-panel-registrations',
  templateUrl: './hackathon-control-panel-registrations.component.html',
  styleUrls: ['./hackathon-control-panel-registrations.component.scss'],
})
export class HackathonControlPanelRegistrationsComponent implements OnInit {
  userDetailsForm: FormGroup;
  registrationTypeId = 1;
  hackathon: IHackathon;

  constructor(
    private fb: FormBuilder,
    private hrgService: HackathonResponseGroupService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
  ) {
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
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.fetchHackathonDetails(params.get('hackathon_id'));
    });
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
  fetchHackathonDetails(hackathonId) {
    this.hackathonService.showHackathon(hackathonId).subscribe((data) => {
      this.hackathon = data;
    });
  }

  submit(formResponse) {
    this.hrgService
      .createHackathonResponseGroup(
        JSON.stringify(this.userDetailsForm.value),
        1,
        this.registrationTypeId,
        `${this.hackathon.name} - Registration`,
      )
      .subscribe((data) => {
        if (data) this.toastrService.successDialog('Information Updated');
      });
  }
}
