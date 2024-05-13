import { Component, Input, OnInit } from '@angular/core';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ExpertsService } from 'apps/commudle-admin/src/app/services/experts.service';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-experts-users',
  templateUrl: './experts-users.component.html',
  styleUrls: ['./experts-users.component.scss'],
})
export class ExpertsUsersComponent implements OnInit {
  @Input() BadgeId: number;
  experts: IUser[] = [];
  pageInfo: IPageInfo;
  total: number;
  isLoadingExperts = true;
  limit = 6;

  constructor(private expertsService: ExpertsService) {}

  ngOnInit(): void {
    this.getExperts();
  }

  getExperts() {
    this.isLoadingExperts = true;
    this.expertsService.getExpertUsers(this.BadgeId, this.pageInfo?.end_cursor, this.limit).subscribe((data) => {
      this.experts = this.experts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.pageInfo = data.page_info;
      this.isLoadingExperts = false;
    });
  }
}
