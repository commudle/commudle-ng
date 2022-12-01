import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'projects/commudle-admin/src/app/services/job.service';
import { IPageInfo } from 'projects/shared-models/page-info.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  constructor(private jobService: JobService, private route: Router) {}

  page_info: IPageInfo;
  users: IUser[] = [];
  limit = 10;
  isLoading = true;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getEmployeesList();
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
}
