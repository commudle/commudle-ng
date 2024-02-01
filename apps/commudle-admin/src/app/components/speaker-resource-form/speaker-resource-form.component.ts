import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { EAttachmentType } from '@commudle/shared-models';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';
import { validate } from 'uuid';

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
  staticAssets = staticAssets;
  currentUser: ICurrentUser;
  userProfileDetails: IUserStat;
  uploadedPdf: File;
  uploadedPdfSrc = '';
  EAttachmentType = EAttachmentType;
  source: string;

  @ViewChild('googleSlidesEmbed', { read: TemplateRef }) googleSlidesEmbedTemplate: TemplateRef<HTMLElement>;

  speakerResourceForm;

  @ViewChild('fileInput') fileInput: any;

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
  ) {
    this.speakerResourceForm = this.fb.group(
      {
        title: ['', Validators.required],
        embedded_content: [''],
        session_details_links: ['', Validators.required],
        attachment_type: ['link'],
      },
      {
        validators: [
          (fb) =>
            (fb.get('attachment_type').value === EAttachmentType.LINK ||
              fb.get('attachment_type').value === EAttachmentType.EMBEDDED_LINK) &&
            !fb.get('embedded_content').value
              ? { embedded_content: true }
              : null,
        ],
      },
    );
  }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
    this.appUsersService.getProfileStats().subscribe((data) => {
      this.userProfileDetails = data;
    });

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
        this.uploadedPdfSrc = data.presentation_file.url;
      }

      if (data.embedded_content) {
        this.speakerResourceForm.get('embedded_content').valueChanges.subscribe((val) => {
          if (val.startsWith('<iframe src=') && val.endsWith('</iframe>')) {
            this.embedGoogleSlidesCode = this.sanitizer.bypassSecurityTrustHtml(val);
          } else {
            this.embedGoogleSlidesCode = null;
          }
        });
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
    this.speakerResourceForm.patchValue({
      title: this.speakerResource.title,
      embedded_content: this.speakerResource.embedded_content,
      session_details_links: this.speakerResource.session_details_links,
      attachment_type: this.speakerResource.attachment_type,
    });
  }

  submitForm() {
    if (
      this.speakerResourceForm.invalid ||
      (this.speakerResourceForm.get('attachment_type').value === EAttachmentType.PDF_FILE && this.uploadedPdfSrc === '')
    ) {
      this.toastLogService.warningDialog('Required Field');
      return;
    }
    this.speakerResourcesService
      .createOrUpdateByToken(this.token, this.getSpeakerResponseFormData(), this.eventId)
      .subscribe((data) => {
        this.toastLogService.successDialog('Saved!');
        this.router.navigate(['/communities', this.community.slug, 'events', this.speakerResource.event.slug]);
      });
  }

  getSpeakerResponseFormData(): FormData {
    const formData = new FormData();
    const srfValue = this.speakerResourceForm.value;

    Object.keys(srfValue).forEach((key) => {
      if (srfValue[key] !== null && srfValue[key] !== undefined && srfValue[key] !== '') {
        formData.append(`speaker_resource[${key}]`, srfValue[key]);
      }
    });

    if (this.uploadedPdf != null) {
      formData.append('speaker_resource[presentation_file]', this.uploadedPdf);
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
      this.uploadedPdf = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedPdfSrc = <string>reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removePdfFile() {
    if (!this.uploadedPdfSrc) {
      this.fileInput.nativeElement.value = '';
    }
    this.uploadedPdf = null;
    this.uploadedPdfSrc = '';
  }
}
