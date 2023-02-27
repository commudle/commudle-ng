import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'apps/commudle-admin/src/app/services/job.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.component.html',
  styleUrls: ['./employers-list.component.scss'],
})
export class EmployersListComponent implements OnInit, OnDestroy {
  page_info: IPageInfo;
  users: IUser[] = [];
  limit = 10;
  isLoading = true;
  subscriptions: Subscription[] = [];

  constructor(private jobService: JobService, private route: Router, private seoService: SeoService) {}

  ngOnInit(): void {
    this.getEmployersList();
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getEmployersList() {
    this.subscriptions.push(
      this.jobService
        .getEmployersList({
          after: this.page_info?.end_cursor,
          limit: this.limit,
        })
        .subscribe((data) => {
          this.users = this.users.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoading = false;
        }),
    );
  }

  redirectToProfile(username) {
    this.route.navigate(['/users/', username], { fragment: 'jobs' });
  }

  setMeta(): void {
    this.seoService.setTags(
      'Techies Who Are Hiring',
      'Find your next internship, job, volunteership as a developer, designer, architect, product manager and more tech roles!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
