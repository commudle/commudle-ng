import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@commudle/theme';
import { ICommunity } from 'apps/shared-models/community.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunitiesService } from '../../services/communities.service';
import { SpeakerResourcesService } from '../../services/speaker-resources.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { ERegistrationType, IAttachedFile } from '@commudle/shared-models';

@Component({
  selector: 'app-speaker-resource-form',
  templateUrl: './speaker-resource-form.component.html',
  styleUrls: ['./speaker-resource-form.component.scss'],
})
export class SpeakerResourceFormComponent implements OnInit {
  token: string;
  eventId: number;
  speakerResource: ISpeakerResource;
  community: ICommunity;
  embedGoogleSlidesCode: any;
  showPdfOption = true;
  showEmbedOption = false;
  showLinkOption = false;
  staticAssets = staticAssets;
  currentUser: ICurrentUser;
  userProfileDetails;
  uploadedResume: File;
  uploadedResumeSrc: string;
  ERegistrationType = ERegistrationType;
  source: string;

  @ViewChild('googleSlidesEmbed', { read: TemplateRef }) googleSlidesEmbedTemplate: TemplateRef<HTMLElement>;

  speakerResourceForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private sanitizer: DomSanitizer,
    private communitiesService: CommunitiesService,
    private toastLogService: LibToastLogService,
    private nbToastrService: NbToastrService,
    private router: Router,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
    private cdr: ChangeDetectorRef,
  ) {
    this.speakerResourceForm = this.fb.group({
      title: ['', Validators.required],
      embedded_content: [''],
      session_details_links: ['', Validators.required],
      attachment_type: ['link'],
    });
  }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
    this.appUsersService.getProfileStats().subscribe((data) => {
      this.userProfileDetails = data;
    });
    if (this.speakerResourceForm.get('attachment_type').value === 'embedded_link') {
      this.speakerResourceForm.get('embedded_content').valueChanges.subscribe((val) => {
        if (val.startsWith('<iframe src=') && val.endsWith('</iframe>')) {
          this.embedGoogleSlidesCode = this.sanitizer.bypassSecurityTrustHtml(val);
        } else {
          this.embedGoogleSlidesCode = null;
        }
      });
    }

    this.activatedRoute.queryParams.subscribe((data) => {
      this.token = data['token'];
      this.eventId = data['event_id'];
      this.getSpeakerResource();
    });
  }

  getSpeakerResource() {
    this.speakerResourcesService.getByToken(this.token, this.eventId).subscribe((data) => {
      this.speakerResource = data;
      if (data.presentation_file) {
        this.uploadedResumeSrc = data.presentation_file.url;
      }
      if (this.speakerResource.id) {
        this.prefillForm();
      }
      this.getCommunity();
    });
  }

  getCommunity() {
    this.communitiesService
      .getCommunityDetails(this.speakerResource.event.kommunity_id)
      .subscribe((data) => (this.community = data));
  }

  prefillForm() {
    this.speakerResourceForm.patchValue(this.speakerResource);
  }

  submitForm() {
    this.speakerResourcesService
      .createOrUpdateByToken(this.token, this.getResumeFormData(), this.eventId)
      .subscribe((data) => {
        this.toastLogService.successDialog('Saved!');
        this.router.navigate(['/communities', this.community.slug, 'events', this.speakerResource.event.slug]);
      });
  }

  getResumeFormData(): FormData {
    const formData = new FormData();
    const resumeValue = this.speakerResourceForm.value;

    Object.keys(resumeValue).forEach((key) => {
      if (resumeValue[key] !== null && resumeValue[key] !== undefined && resumeValue[key] !== '') {
        formData.append(`speaker_resource[${key}]`, resumeValue[key]);
      }
    });

    if (this.uploadedResume != null) {
      formData.append('speaker_resource[presentation_file]', this.uploadedResume);
    }
    return formData;
  }

  openGoogleSlidesEmbedStepsWindow() {
    this.windowService.open(this.googleSlidesEmbedTemplate, { title: 'Steps to get Google Slides Embed Link' });
  }

  onFileChange(event) {
    if (event.target.files) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.nbToastrService.warning('File must be a pdf', 'Warning');
        return;
      }

      if (event.target.files[0].size > 30000000) {
        this.nbToastrService.warning('File must be less than 30MB', 'Warning');
        return;
      }

      const file = event.target.files[0];
      this.uploadedResume = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedResumeSrc = <string>reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
