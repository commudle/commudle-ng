import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { NbStepperComponent } from '@commudle/theme';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { IHackathon, EParticipateTypes } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import { faLinkedinIn, faTwitter, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faInfoCircle, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { IContactInfo } from 'apps/shared-models/contact-info.model';

@Component({
  selector: 'commudle-public-hackathon-form',
  templateUrl: './public-hackathon-form.component.html',
  styleUrls: ['./public-hackathon-form.component.scss'],
})
export class PublicHackathonFormComponent implements OnInit {
  hackathon: IHackathon;
  community: ICommunity;
  hackathonResponseGroup: IHackathonResponseGroup;
  subscriptions: Subscription[] = [];
  hackathonUserResponse: IHackathonUserResponse;
  contactInfo: IContactInfo;

  @ViewChild('stepper') stepper: NbStepperComponent;

  isLoading = true;
  showTeammateForm = false;

  icons = {
    faLinkedinIn,
    faTwitter,
    faFacebookF,
    faGlobe,
    faGithub,
    faInfoCircle,
    faHashtag,
  };

  constructor(
    private hrgService: HackathonResponseGroupService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private hurService: HackathonUserResponsesService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.hrgService
        .pShowHackathonResponseGroup(this.activatedRoute.snapshot.params['hackathon_response_group_id'])
        .subscribe((data: IHackathonResponseGroup) => {
          this.hackathonResponseGroup = data;
          this.fetchPreExistingFormResponse();
        }),
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.community = data.community;
        this.getContactInfo();
        if (this.hackathon.participate_types === EParticipateTypes.TEAM) {
          this.showTeammateForm = true;
        }
      }),
    );
  }

  getContactInfo() {
    this.subscriptions.push(
      this.hackathonService.showHackathonContactInfo(this.hackathon.id).subscribe((data) => {
        this.contactInfo = data;
      }),
    );
  }

  fetchPreExistingFormResponse() {
    this.hurService
      .getExistingHackathonUserResponses(this.hackathonResponseGroup.id)
      .subscribe((data: IHackathonUserResponse[]) => {
        if (data) {
          this.hackathonUserResponse = data[0];
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  }

  submitUserResponse(formData) {
    this.hurService.createHackathonResponseGroup(formData, this.hackathonResponseGroup.id).subscribe((data) => {
      this.hackathonUserResponse = data;
      this.stepper.next();
    });
  }

  updateUserResponse(formData) {
    this.hurService.updateHackathonResponseGroup(formData, this.hackathonUserResponse.id).subscribe((data) => {
      this.hackathonUserResponse = data;
      this.stepper.next();
    });
  }

  submitTeammateDetails(formData) {
    this.hurService.updateTeamDetails(formData, this.hackathonUserResponse.id).subscribe((data) => {
      if (data) this.stepper.next();
    });
  }

  submitProjectDetails(formData) {
    this.hurService.updateProjectDetails(formData, this.hackathonUserResponse.id).subscribe((data) => {
      if (data) this.stepper.next();
    });
  }
}
