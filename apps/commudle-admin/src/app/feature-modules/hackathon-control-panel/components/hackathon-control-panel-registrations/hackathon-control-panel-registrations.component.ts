import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'commudle-hackathon-control-panel-registrations',
  templateUrl: './hackathon-control-panel-registrations.component.html',
  styleUrls: ['./hackathon-control-panel-registrations.component.scss'],
})
export class HackathonControlPanelRegistrationsComponent implements OnInit {
  userDetailsForm: FormGroup;
  constructor(private fb: FormBuilder) {
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

  ngOnInit() {}

  submit() {
    console.log(
      '🚀 ~ HackathonControlPanelRegistrationsComponent ~ submit ~  this.userDetailsForm.value:',
      this.userDetailsForm.value,
    );
  }
}
