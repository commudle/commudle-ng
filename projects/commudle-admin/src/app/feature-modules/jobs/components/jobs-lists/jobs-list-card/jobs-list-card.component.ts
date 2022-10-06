import { Component, Input, OnInit } from '@angular/core';
import { IJob } from 'projects/shared-models/job.model';

@Component({
  selector: 'app-jobs-list-card',
  templateUrl: './jobs-list-card.component.html',
  styleUrls: ['./jobs-list-card.component.scss'],
})
export class JobsListCardComponent implements OnInit {
  @Input() Jobs: IJob;
  constructor() {}

  ngOnInit() {}
}
