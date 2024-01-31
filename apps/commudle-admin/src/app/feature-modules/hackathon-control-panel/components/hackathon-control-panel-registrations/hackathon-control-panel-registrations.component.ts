import { EModelName } from '@commudle/shared-models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '@commudle/shared-services';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
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
  EModelName = EModelName;
  dataFormId: number;

  constructor(
    private fb: FormBuilder,
    private hrgService: HackathonResponseGroupService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private dataFormsService: DataFormsService,
    private toastrService: ToastrService,
  ) {
    this.userDetailsForm = this.fb.group({
      name: false,
      designation: false,
      about_me: false,
      location: false,
      work_experience_months: false,
      education: false,
      phone: false,
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
  }
  fetchHackathonDetails(hackathonId) {
    this.hackathonService.showHackathon(hackathonId).subscribe((data) => {
      this.hackathon = data;
      this.fetchHackathonResponseGroup();
    });
  }

  fetchHackathonResponseGroup() {
    this.hrgService.showHackathonResponseGroup(this.hackathon.id).subscribe((data: IHackathonResponseGroup) => {
      if (data) {
        this.dataFormId = data.data_form_id;
        this.userDetailsForm.patchValue({
          name: data.user_details.name,
          designation: data.user_details.designation,
          about_me: data.user_details.about_me,
          location: data.user_details.location,
          work_experience_months: data.user_details.work_experience_months,
          education: data.user_details.education,
          phone: data.user_details.phone,
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
    this.dataFormsService.createDataForm(formResponse, this.hackathon.id, EModelName.HACKATHON).subscribe((data) => {
      if (data) {
        this.hrgService
          .createHackathonResponseGroup(
            JSON.stringify(this.userDetailsForm.value),
            this.hackathon.id,
            this.registrationTypeId,
            `${this.hackathon.name} - Registration`,
            data.id,
          )
          .subscribe((data) => {
            if (data) this.toastrService.successDialog('Information Updated');
          });
      }
    });
  }
}
