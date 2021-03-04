import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ILab, EPublishStatus } from 'projects/shared-models/lab.model';
import { LabsService } from '../../services/labs.service';
import { Title, Meta } from '@angular/platform-browser';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NbWindowService } from '@nebular/theme';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { ITag } from 'projects/shared-models/tag.model';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {
  faFlask = faFlask;

  popularTags: ITag[];
  labs: ILab[];
  selectedTag;

  constructor(
    private labsService: LabsService,
    private meta: Meta,
    private title: Title
  ) {
  }


  // the way this will work

  ngOnInit() {
    this.getTags();
    this.getLabs(null);
    this.setMeta();
  }

  setMeta() {
    this.title.setTitle('Labs | Learn Something New!');
    this.meta.updateTag({
      name: 'description',
      content: 'The best way to learn, is step by step. We introduce Labs, a place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!'
    });
    this.meta.updateTag(
      {
        name: 'og:image',
        content: `https://commudle.com/assets/images/commudle-logo192.png`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `https://commudle.com/assets/images/commudle-logo192.png`
      });
    this.meta.updateTag({ name: 'og:title', content: 'Labs | Learn Something New!' });
    this.meta.updateTag({
      name: 'og:description',
      content: 'The best way to learn, is step by step. We introduce Labs, a place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!'
    });
    this.meta.updateTag({ name: 'og:type', content: 'website'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `https://commudle.com/assets/images/commudle-logo192.png`
      });
    this.meta.updateTag({ name: 'twitter:title', content: 'Labs | Learn Something New!' });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'The best way to learn, is step by step. We introduce Labs, a place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!'
    });
  }

  getTags() {
    this.labsService.pTags().subscribe(
      data => this.popularTags = data.tags
    );
  }

  getLabs(tag) {
    this.selectedTag = tag;
    this.labsService.pIndex(tag).subscribe(
      data => {
        this.labs = data.labs;
      }
    );
  }
}


