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
  minSalary: number = 20000;
  maxSalary: number = 60000;
  salary_options: Options = {
    floor: 0,
    ceil: 100000,
    step: 10000,
    noSwitching: true,
  };
  // experience: number = 2;
  // exp_options: Options = {
  //   floor: 0,
  //   ceil: 10,
  //   step: 1,
  // };

  page = 1;
  count = 10;

  Jobs: IJob[] = [];

  subscriptions: Subscription[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.getJobsList();
  }
  onValueChange(value) {
    this.minSalary = value;
  }
  onExpChange(value) {
    console.log(value);
  }

  onHighValueChange(value) {
    this.maxSalary = value;
  }

  getJobsList() {
    this.subscriptions.push(
      this.jobsService.getJobs(this.page, this.count).subscribe((data) => {
        this.Jobs = data.jobs;
      }),
    );
  }

  formSubmit(form) {
    if (form.value.category == null) {
      form.value.category = '';
    }
    if (form.value.location_type == null) {
      form.value.location_type = '';
    }
    if (form.value.job_type == null) {
      form.value.job_type = '';
    }
    this.subscriptions.push(
      this.jobsService
        .getJobsByFilter(1, 10, form.value.category, form.value.location_type, form.value.job_type)
        .subscribe((data) => {
          this.Jobs = data.jobs;
        }),
    );
    form.reset();
  }

  filterReset(form) {
    form.reset();
    this.minSalary = 20000;
    this.maxSalary = 60000;
    this.getJobsList();
  }
}
