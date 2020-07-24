import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ILab, EPublishStatus } from 'projects/shared-models/lab.model';
import { LabsService } from '../../services/labs.service';
import { Title } from '@angular/platform-browser';
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
    private labsService: LabsService
  ) {
  }

  ngOnInit() {
    this.getTags();
    this.getLabs(null);
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


