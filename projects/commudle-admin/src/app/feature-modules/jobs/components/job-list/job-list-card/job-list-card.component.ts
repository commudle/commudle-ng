import { Component, Input, OnInit } from '@angular/core';
import { IJob } from 'projects/shared-models/job.model';

@Component({
  selector: 'app-job-list-card',
  templateUrl: './job-list-card.component.html',
  styleUrls: ['./job-list-card.component.scss'],
})
export class JobListCardComponent implements OnInit {
  @Input() job: IJob;

  constructor() {}

  ngOnInit(): void {}
}
