/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { NbDialogRef, NbDialogService, NbStepperComponent } from '@commudle/theme';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { IHackathon, EParticipateTypes } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import { faLinkedinIn, faTwitter, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faInfoCircle, faHashtag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IContactInfo } from 'apps/shared-models/contact-info.model';
import { ToastrService } from '@commudle/shared-services';
import { DataFormEntityResponsesService } from 'apps/commudle-admin/src/app/services/data-form-entity-responses.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';

@Component({
  selector: 'commudle-public-hackathon-form',
  templateUrl: './public-hackathon-form.component.html',
  styleUrls: ['./public-hackathon-form.component.scss'],
})
export class PublicHackathonFormComponent implements OnInit, OnDestroy {
  hackathon: IHackathon;
  community: ICommunity;
  hackathonResponseGroup: IHackathonResponseGroup;
  subscriptions: Subscription[] = [];
  hackathonUserResponse: IHackathonUserResponse;
  contactInfo: IContactInfo;

  @ViewChild('stepper') stepper: NbStepperComponent;
  @ViewChild('formConfirmationDialog', { static: true }) formConfirmationDialog: TemplateRef<any>;
  isLoading = true;
  hasTeammateOption = false;

  icons = {
    faLinkedinIn,
    faTwitter,
    faFacebookF,
    faGlobe,
    faGithub,
    faInfoCircle,
    faHashtag,
    faArrowRight,
  };

  currentUser: ICurrentUser;
  userProfileDetails: IUserStat;
  dialogRef: NbDialogRef<any>;

  current_user_is_team_lead = true;

  constructor(
    private hrgService: HackathonResponseGroupService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private hurService: HackathonUserResponsesService,
    private toastrService: ToastrService,
    private dataFormEntityResponsesService: DataFormEntityResponsesService,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.hrgService
        .pFetchHackathonResponseGroup(this.activatedRoute.snapshot.params['hackathon_response_group_id'])
        .subscribe((data: IHackathonResponseGroup) => {
          this.hackathonResponseGroup = data;
          this.fetchPreExistingFormResponse();
        }),
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.community = data.community;
        this.getContactInfo();
        if (this.hackathon.participate_types === EParticipateTypes.TEAM) {
          this.hasTeammateOption = true;
        }
      }),
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser) {
          this.appUsersService.getProfileStats().subscribe((data) => {
            this.userProfileDetails = data;
          });
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.dialogRef?.close();
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
        if (data.length > 0) {
          this.hackathonUserResponse = data[0];
          this.current_user_is_team_lead = this.hackathonUserResponse.current_user_is_team_lead;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  }

  UpdateOrSubmitResponse(formData) {
    this.hackathonService.pCheckParentMember(this.hackathon.id).subscribe((data) => {
      if (data) {
        if (this.hackathonUserResponse) {
          this.updateUserResponse(formData);
        } else {
          this.submitUserResponse(formData);
        }
      } else {
        this.openConsentDialogBox(formData);
      }
    });
  }

  submitUserResponse(formData) {
    this.hurService.createHackathonResponseGroup(formData, this.hackathonResponseGroup.id).subscribe((data) => {
      this.hackathonUserResponse = data;
      if (this.hackathonResponseGroup.filled_by_only_team_lead && !this.current_user_is_team_lead) {
        this.toastrService.successDialog('Details has been saved');
        this.hurService.updateHurStatusComplete(this.hackathonUserResponse.id).subscribe();
        this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
      } else {
        this.stepper.next();
      }
    });
  }

  updateUserResponse(formData) {
    this.hurService.updateHackathonResponseGroup(formData, this.hackathonUserResponse.id).subscribe((data) => {
      this.hackathonUserResponse = data;
      if (this.hackathonResponseGroup.filled_by_only_team_lead && !this.current_user_is_team_lead) {
        this.toastrService.successDialog('Details has been saved');
        this.hurService.updateHurStatusComplete(this.hackathonUserResponse.id).subscribe();
        this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
      } else {
        this.stepper.next();
      }
    });
  }

  submitTeammateDetails(formData) {
    this.hurService.updateTeamDetails(formData, this.hackathonUserResponse.id).subscribe((data) => {
      if (data) this.stepper.next();
    });
  }

  submitProjectDetails(formData) {
    this.hurService.updateProjectDetails(formData, this.hackathonUserResponse.id).subscribe((data) => {
      if (data) {
        if (this.hackathonResponseGroup.data_form_entity_id) {
          this.stepper.next();
        } else {
          this.toastrService.successDialog('Details has been saved');
          this.hurService.updateHurStatusComplete(this.hackathonUserResponse.id).subscribe();
          this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
        }
      }
    });
  }

  submitFormData(formData) {
    this.dataFormEntityResponsesService
      .submitDataFormEntityResponse(this.hackathonResponseGroup.data_form_entity_id, formData)
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Details has been saved');
          this.hurService.updateHurStatusComplete(this.hackathonUserResponse.id).subscribe();
          this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
        }
      });
  }

  previousStepper() {
    this.stepper.previous();
  }

  openConsentDialogBox(formData) {
    const dialogRef = this.dialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.HACKATHON_REGISTRATION,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        return;
      } else {
        if (this.hackathonUserResponse) {
          this.updateUserResponse(formData);
        } else {
          this.submitUserResponse(formData);
        }
      }
    });
  }
}
