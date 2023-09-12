import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService, NbWindowService } from '@commudle/theme';
import { ICommunity } from 'apps/shared-models/community.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunitiesService } from '../../services/communities.service';
import { SpeakerResourcesService } from '../../services/speaker-resources.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-speaker-resource-form',
  templateUrl: './speaker-resource-form.component.html',
  styleUrls: ['./speaker-resource-form.component.scss'],
})
export class SpeakerResourceFormComponent implements OnInit {
  @Input() currentUser: ICurrentUser;
  @Input() userProfileDetails;
  token: string;
  eventId: number;
  speakerResource: ISpeakerResource;
  community: ICommunity;
  embedGoogleSlidesCode: any;
  showpdfOption = true;
  showEmbedOption = false;
  showLinkOption = false;
  staticAssets = staticAssets;

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
  ) {
    this.speakerResourceForm = this.fb.group({
      title: ['', Validators.required],
      embedded_content: [''],
      session_details_links: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
    this.speakerResourceForm.get('embedded_content').valueChanges.subscribe((val) => {
      if (val.startsWith('<iframe src=') && val.endsWith('</iframe>')) {
        this.embedGoogleSlidesCode = this.sanitizer.bypassSecurityTrustHtml(val);
      } else {
        this.embedGoogleSlidesCode = null;
      }
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
      .createOrUpdateByToken(this.token, this.speakerResourceForm.value, this.eventId)
      .subscribe((data) => {
        this.toastLogService.successDialog('Saved!');
        this.router.navigate(['/communities', this.community.slug, 'events', this.speakerResource.event.slug]);
      });
  }

  openGoogleSlidesEmbedStepsWindow() {
    this.windowService.open(this.googleSlidesEmbedTemplate, { title: 'Steps to get Google Slides Embed Link' });
  }

  onItemChange(data) {
    this.showpdfOption = data.value === 'pdf' ? true : false;
    this.showLinkOption = data.value === 'link' ? true : false;
    this.showEmbedOption = data.value === 'embed' ? true : false;
  }

  onFileChange(event) {
    if (event.target.files) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.nbToastrService.warning('File must be a pdf', 'Warning');
        return;
      }

      const file = event.target.files[0];
      // this.uploadedResume = {
      //   id: null,
      //   file: file,
      //   url: null,
      //   name: null,
      //   type: null,
      // };

      // const reader = new FileReader();
      // reader.onload = () => (this.uploadedResumeSrc = <string>reader.result);
      // reader.readAsDataURL(file);
    }
  }
}
