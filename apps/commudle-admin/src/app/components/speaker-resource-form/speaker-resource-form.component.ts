import { Component, OnInit, TemplateRef, ViewChild, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakerResourcesService } from '../../services/speaker-resources.service';
import { ISpeakerResource } from '@commudle/shared-models';
import { FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { DomSanitizer } from '@angular/platform-browser';
import { ICommunity } from '@commudle/shared-models';
import { CommunitiesService } from '../../services/communities.service';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-speaker-resource-form',
  templateUrl: './speaker-resource-form.component.html',
  styleUrls: ['./speaker-resource-form.component.scss']
})
export class SpeakerResourceFormComponent implements OnInit {
  token: string;
  eventId: number;
  speakerResource: ISpeakerResource;
  community: ICommunity;
  embedGoogleSlidesCode: any;
  @ViewChild('googleSlidesEmbed', { read: TemplateRef }) googleSlidesEmbedTemplate: TemplateRef<HTMLElement>;



  speakerResourceForm = this.fb.group({
    title: ["", Validators.required],
    embedded_content: [""],
    session_details_links: ["", Validators.required],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private sanitizer: DomSanitizer,
    private communitiesService: CommunitiesService,
    private toastLogService: LibToastLogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.speakerResourceForm.get('embedded_content').valueChanges.subscribe(val => {
      if (val.startsWith('<iframe src=') && val.endsWith("</iframe>")) {
        this.embedGoogleSlidesCode = this.sanitizer.bypassSecurityTrustHtml(val);
      } else {
        this.embedGoogleSlidesCode = null;
      }
    });

    this.activatedRoute.queryParams.subscribe(
      data => {
        this.token = data['token'];
        this.eventId = data['event_id']
        this.getSpeakerResource();
      }
    );
  }

  getSpeakerResource() {
    this.speakerResourcesService.getByToken(this.token, this.eventId).subscribe(
      data => {
        this.speakerResource = data;
        if (this.speakerResource.id) {
          this.prefillForm();
        }
        this.getCommunity();
      }
    );
  }

  getCommunity() {
    this.communitiesService.getCommunityDetails(this.speakerResource.event.kommunity_id).subscribe(
      data => this.community = data
    );
  }


  prefillForm() {
    this.speakerResourceForm.patchValue(this.speakerResource);
  }

  submitForm() {
    this.speakerResourcesService.createOrUpdateByToken(this.token, this.speakerResourceForm.value, this.eventId).subscribe(
      data => {
        this.toastLogService.successDialog('Saved!');
        this.router.navigate(['/communities', this.community.slug, 'events', this.speakerResource.event.slug]);
      }
    );
  }

  openGoogleSlidesEmbedStepsWindow() {
    this.windowService.open(
      this.googleSlidesEmbedTemplate,
      { title: 'Steps to get Google Slides Embed Link' },
    );
  }

}
