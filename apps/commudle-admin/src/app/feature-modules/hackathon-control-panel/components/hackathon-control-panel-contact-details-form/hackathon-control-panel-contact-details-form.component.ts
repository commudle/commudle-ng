import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, countries_details } from '@commudle/shared-services';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IContactInfo } from 'apps/shared-models/contact-info.model';
import { Subscription } from 'rxjs';
import { environment } from '@commudle/shared-environments';

@Component({
  selector: 'commudle-hackathon-control-panel-contact-details-form',
  templateUrl: './hackathon-control-panel-contact-details-form.component.html',
  styleUrls: ['./hackathon-control-panel-contact-details-form.component.scss'],
})
export class HackathonControlPanelContactDetailsFormComponent implements OnInit {
  hackathonContactForm: FormGroup;
  subscriptions: Subscription[] = [];

  countriesDetails = countries_details;
  contactInfo: IContactInfo;
  hackathonSlug = '';
  communitySlug = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
  ) {
    this.hackathonContactForm = this.fb.group({
      website: ['', this.urlValidator],
      email: ['', [Validators.required, Validators.email]],
      country_code: [91, Validators.required],
      phone_number: ['', [Validators.required]],
      twitter: ['', this.urlValidator],
      facebook: ['', this.urlValidator],
      instagram: ['', this.urlValidator],
      linkedIn: ['', this.urlValidator],
      discord: ['', this.urlValidator],
      slack: ['', this.urlValidator],
      github: ['', this.urlValidator],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.communitySlug = params.get('community_id');
      this.fetchHackathonContactDetails(params.get('hackathon_id'));
    });
  }

  urlValidator(control) {
    if (control.value && !/^(http|https)/.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  }

  fetchHackathonContactDetails(hackathonSlug) {
    this.subscriptions.push(
      this.hackathonService.showHackathonContactInfo(hackathonSlug).subscribe((data: IContactInfo) => {
        this.contactInfo = data;
        if (data) {
          this.hackathonContactForm.patchValue({
            website: data.website,
            email: data.email,
            country_code: data.country_code,
            phone_number: data.phone_number,
            twitter: data.twitter,
            facebook: data.facebook,
            instagram: data.instagram,
            linkedIn: data.linkedIn,
            discord: data.discord,
            slack: data.slack,
            github: data.github,
          });
        } else {
          this.hackathonContactForm.patchValue({
            website: 'https://www.commudle.com/communities/' + this.communitySlug + '/hackathons/' + this.hackathonSlug,
          });
        }
      }),
    );
  }

  createOrUpdate() {
    if (this.contactInfo) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    this.hackathonService
      .updateHackathonContactInfo(this.hackathonContactForm.value, this.hackathonSlug)
      .subscribe((data) => {
        if (data) this.toastrService.successDialog('Contact Info updated');
      });
  }

  create() {
    this.hackathonService
      .createHackathonContactInfo(this.hackathonContactForm.value, this.hackathonSlug)
      .subscribe((data) => {
        if (data) this.toastrService.successDialog('Contact Info updated');
      });
  }
}
