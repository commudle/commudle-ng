import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathon, EParticipateTypes } from 'apps/shared-models/hackathon.model';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'commudle-hackathon-basic-form',
  templateUrl: './hackathon-basic-form.component.html',
  styleUrls: ['./hackathon-basic-form.component.scss'],
})
export class HackathonBasicFormComponent implements OnInit, OnDestroy {
  hackathonForm: FormGroup;
  hackathonSlug = '';
  parentId = '';
  parentType = '';

  subscriptions: Subscription[] = [];
  hackathon: IHackathon;
  EParticipateTypes = EParticipateTypes;

  tinyMCE = {
    min_height: 300,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write description for hackathon',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins:
      'emoticons advlist lists autolink link charmap preview anchor image visualblocks code charmap codesample insertdatetime table code help wordcount autoresize media',
    toolbar:
      'h1  h2  h3  h4  h5  h6 fontsize | bold italic backcolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
    font_size_formats: '12pt 14pt 16pt 18pt 24pt',
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
  ) {
    this.hackathonForm = this.fb.group({
      name: ['', Validators.required],
      tagline: ['', Validators.required],
      description: ['', Validators.required],
      hackathon_theme: ['', Validators.required],
      number_of_participants: ['', [Validators.required, Validators.min(0)]],
      participate_types: ['', Validators.required],
      banner_image: [File],
    });
  }

  ngOnInit() {
    combineLatest([this.activatedRoute.parent.parent.paramMap, this.activatedRoute.params]).subscribe(
      ([params, data]) => {
        this.hackathonSlug = data.hackathon_slug;
        if (params.get('community_id')) {
          this.parentId = params.get('community_id');
          this.parentType = 'Kommunity';
        }
        if (params.get('community_group_id')) {
          this.parentId = params.get('community_group_id');
          this.parentType = 'CommunityGroup';
        }

        // if (this.hackathonSlug) {
        // }
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  createOrUpdate() {
    if (this.hackathonSlug) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.hackathonService.createHackathon(this.hackathonForm, this.parentId, this.parentType).subscribe((data) => {
      console.log(
        '🚀 ~ file: hackathon-basic-form.component.ts:85 ~ HackathonBasicFormComponent ~ this.hackathonService.createHackathon ~ data:',
        data,
      );
    });
  }

  update() {}
}
