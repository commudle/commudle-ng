import { Component, OnInit } from '@angular/core';
import { IJob } from 'projects/shared-models/job.model';
import { Subscription } from 'rxjs';
import { JobsService } from 'projects/commudle-admin/src/app/feature-modules/jobs/services/jobs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LabelType, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-jobs-lists',
  templateUrl: './jobs-lists.component.html',
  styleUrls: ['./jobs-lists.component.scss'],
})
export class JobsListsComponent implements OnInit {
  minSalary: number = 10000;
  maxSalary: number = 40000;
  options: Options = {
    floor: 0,
    ceil: 100000,
    step: 10000,
    noSwitching: true,
  };
  Jobs: IJob[] = [];

  subscriptions: Subscription[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.getJobsList();
  }
  onValueChange(value) {
    this.minSalary = value;
  }

  onHighValueChange(value) {
    this.maxSalary = value;
  }

  getJobsList() {
    this.subscriptions.push(
      this.jobsService.getJobs(1, 10).subscribe((data) => {
        this.Jobs = data.jobs;
      }),
    );
  }
  formSubmit(form) {
    this.subscriptions.push(
      this.jobsService
        .getJobsByFilter(1, 10, form.value.category, form.value.location_type, form.value.job_type)
        .subscribe((data) => {
          this.Jobs = data.jobs;
        }),
    );
  }
  freset(form) {
    form.reset();
    form.value.category = ' ';
    form.value.job_type = ' ';
    form.value.location_type = ' ';
    this.getJobsList();
  }
}
