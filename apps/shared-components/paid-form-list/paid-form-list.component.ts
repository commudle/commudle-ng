import { Component, Input, OnInit } from '@angular/core';
import { IPageInfo } from '@commudle/shared-models';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-paid-form-list',
  templateUrl: './paid-form-list.component.html',
  styleUrls: ['./paid-form-list.component.scss'],
})
export class PaidFormListComponent implements OnInit {
  @Input() communityId: number | string;
  eventDataFormEntityGroup: IEventDataFormEntityGroup[] = [];
  pageInfo: IPageInfo;
  total: number;
  subscriptions: Subscription[] = [];
  isLoading = false;

  constructor(private edfergService: EventDataFormEntityGroupsService) {}

  ngOnInit() {
    console.log('🚀 ~ PaidFormListComponent ~ ngOnInit ~ this.communityId:', this.communityId);
    if (this.communityId) {
      this.getEdfegListByCommunity();
    } else {
      this.getEdfegList();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getEdfegListByCommunity() {
    this.isLoading = true;
    this.subscriptions.push(
      this.edfergService.getIndexByCommunity(this.communityId, this.pageInfo?.end_cursor).subscribe((data) => {
        this.eventDataFormEntityGroup = this.eventDataFormEntityGroup.concat(
          data.page.reduce((acc, value) => [...acc, value.data], []),
        );
        this.total = data.total;
        this.pageInfo = data.page_info;
        this.isLoading = false;
      }),
    );
  }
  getEdfegList() {
    this.isLoading = true;
    this.subscriptions.push(
      this.edfergService.getList(this.pageInfo?.end_cursor).subscribe((data) => {
        this.eventDataFormEntityGroup = this.eventDataFormEntityGroup.concat(
          data.page.reduce((acc, value) => [...acc, value.data], []),
        );
        this.total = data.total;
        this.pageInfo = data.page_info;
        this.isLoading = false;
      }),
    );
  }
}
