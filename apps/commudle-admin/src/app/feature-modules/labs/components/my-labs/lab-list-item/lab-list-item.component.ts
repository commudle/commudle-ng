import { StatsLabsService } from './../../../../../services/stats/stats-labs.service';
import { NbWindowService } from '@nebular/theme';
import { ILab, ELabPublishStatus, ELabPublishStatusColors } from '@commudle/shared-models';
import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'commudle-lab-list-item',
  templateUrl: './lab-list-item.component.html',
  styleUrls: ['./lab-list-item.component.scss']
})
export class LabListItemComponent implements OnInit {
  @Input() lab: ILab;
  @Output() destroyLab = new EventEmitter();
  @ViewChild('confirmDeleteTemplate') confirmDeleteTemplate: TemplateRef<any>;

  moment = moment;
  ELabPublishStatus = ELabPublishStatus;
  ELabPublishStatusColors = ELabPublishStatusColors;
  windowRef;
  stats;


  constructor(
    private windowService: NbWindowService,
    private statsLabsService: StatsLabsService
  ) { }

  ngOnInit() {
    this.getStats();
  }

  openDeleteConfirmation(cBuild) {
    this.windowRef = this.windowService.open(
      this.confirmDeleteTemplate,
      {title: `Are you sure you want to delete ${cBuild.name}?`, context: { name: cBuild.name } },
    );
  }

  deleteLab() {
    this.destroyLab.emit(this.lab.id);
    this.windowRef.close();
  }

  getStats() {
    this.statsLabsService.userEngagement(this.lab.id).subscribe(
      data => {
        this.stats = data;
      }
    );
  }

}
