import { PageAdsComponent } from './../../shared-modules/page-ads/components/page-ads/page-ads.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'commudle-user-details-checkbox-form',
  templateUrl: './user-details-checkbox-form.component.html',
  styleUrls: ['./user-details-checkbox-form.component.scss'],
})
export class UserDetailsCheckboxFormComponent implements OnInit {
  @Input() showGoodiesContainer = false;
  @Output() userDetailsFormValues = new EventEmitter<{}>();
  userDetailsForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userDetailsForm = this.fb.group({
      name: true,
      profile_image: true,
      email: true,
      designation: false,
      about_me: false,
      location: false,
      work_experience_months: false,
      education: false,
      phone: false,
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

  updateValues() {
    this.userDetailsFormValues.emit(this.userDetailsForm.getRawValue());
  }
}
