import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EJobStatus, IJob } from 'projects/shared-models/job.model';
import { IUserResume } from 'projects/shared-models/user_resume.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-job-list-card',
  templateUrl: './job-list-card.component.html',
  styleUrls: ['./job-list-card.component.scss'],
})
export class JobListCardComponent implements OnInit {
  @Input() job: IJob;

  currentUser: ICurrentUser;
  userResumes: IUserResume[] = [];
  subscriptions: Subscription[] = [];

  jobStatus = EJobStatus;

  selectedUserResumeId: number;
  faBuilding = faBuilding;

  constructor(private authWatchService: LibAuthwatchService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
