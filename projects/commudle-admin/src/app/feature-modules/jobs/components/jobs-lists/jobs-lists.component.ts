import { Component, OnInit } from '@angular/core';
import { IJob } from 'projects/shared-models/job.model';
import { Subscription } from 'rxjs';
import { JobsService } from 'projects/commudle-admin/src/app/feature-modules/jobs/services/jobs.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-jobs-lists',
  templateUrl: './jobs-lists.component.html',
  styleUrls: ['./jobs-lists.component.scss'],
})
export class JobsListsComponent implements OnInit {
  Jobs: IJob[] = [];

  subscriptions: Subscription[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.getJobsList();
  }

  getJobsList() {
    this.subscriptions.push(
      this.jobsService.getJobs(1, 10).subscribe((data) => {
        this.Jobs = data.jobs;
        // console.log(data.jobs);
      }),
    );
  }
  filter() {
    console.log(this.Jobs);
    // this.Jobs.find('job');

    // this.Jobs.indexOf('location');
    // console.log('filter works');
    // this.subscriptions.push(
    //   this.jobsService.getJobsByFilter(1, 10, 'job').subscribe((data) => {
    //     console.log(data);
    //   }),
    // );
  }
}
