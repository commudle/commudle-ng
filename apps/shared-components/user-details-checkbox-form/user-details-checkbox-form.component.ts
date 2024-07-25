import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'commudle-user-details-checkbox-form',
  templateUrl: './user-details-checkbox-form.component.html',
  styleUrls: ['./user-details-checkbox-form.component.scss'],
})
export class UserDetailsCheckboxFormComponent implements OnInit, OnChanges {
  @Input() userDetails;
  @Input() showGoodiesContainer = false;
  @Input() showExperienceField = true;
  @Output() userDetailsFormValues = new EventEmitter<{}>();
  userDetailsForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userDetailsForm = this.fb.group({
      name: true,
      profile_image: true,
      email: true,
      designation: false,
      about_me: true,
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

  ngOnChanges(): void {
    if (this.userDetails) {
      this.userDetailsForm.patchValue({
        name: this.userDetails.name,
        profile_image: this.userDetails.profile_image,
        email: this.userDetails.email,
        designation: this.userDetails.designation,
        about_me: this.userDetails.about_me,
        location: this.userDetails.location,
        work_experience_months: this.userDetails.work_experience_months,
        education: this.userDetails.education,
        phone: this.userDetails.phone,
        twitter: this.userDetails.twitter,
        linkedin: this.userDetails.linkedin,
        dribbble: this.userDetails.dribbble,
        youtube: this.userDetails.youtube,
        medium: this.userDetails.medium,
        behance: this.userDetails.behance,
        gitlab: this.userDetails.gitlab,
        github: this.userDetails.github,
        facebook: this.userDetails.facebook,
        tshirt_size: this.userDetails.tshirt_size,
      });
    }
  }

  updateValues() {
    this.userDetailsFormValues.emit(this.userDetailsForm.getRawValue());
  }
}
