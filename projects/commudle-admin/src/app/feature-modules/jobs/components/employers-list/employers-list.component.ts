import { Component, OnInit } from '@angular/core';
import { JobService } from 'projects/commudle-admin/src/app/services/job.service';
import { IPageInfo } from 'projects/shared-models/page-info.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.component.html',
  styleUrls: ['./employers-list.component.scss'],
})
export class EmployersListComponent implements OnInit {
  constructor(private jobService: JobService) {}
  page_info: IPageInfo;
  users: IUser[] = [];
  limit = 10;
  isLoading = true;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getEmployersList();
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
}
