import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { EJobStatus, IJob } from 'apps/shared-models/job.model';
import { IUserResume } from 'apps/shared-models/user_resume.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import {
  faBuilding,
  faMoneyBills,
  faLocationDot,
  faIdCard,
  faClock,
  faSuitcase,
} from '@fortawesome/free-solid-svg-icons';

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
  faMoneyBills = faMoneyBills;
  faLocationDot = faLocationDot;
  faIdCard = faIdCard;
  faClock = faClock;
  faSuitcase = faSuitcase;

  constructor(private authWatchService: LibAuthwatchService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
