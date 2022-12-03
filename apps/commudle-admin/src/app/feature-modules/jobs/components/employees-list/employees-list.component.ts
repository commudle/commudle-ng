import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'apps/commudle-admin/src/app/services/job.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  page_info: IPageInfo;
  users: IUser[] = [];
  limit = 10;
  isLoading = true;
  subscriptions: Subscription[] = [];

  constructor(private jobService: JobService, private route: Router, private seoService: SeoService) {}

  ngOnInit(): void {
    this.getEmployeesList();
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getEmployeesList() {
    this.subscriptions.push(
      this.jobService
        .getEmployeesList({
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
    this.route.navigate(['/users/', username]);
  }

  setMeta(): void {
    this.seoService.setTags(
      'Techies Looking To Get Hired',
      'Find interns, volunteers, full time and part time teammates or freelancers too. Hire for office and remote locations from the thousands of techies on Commudle',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
