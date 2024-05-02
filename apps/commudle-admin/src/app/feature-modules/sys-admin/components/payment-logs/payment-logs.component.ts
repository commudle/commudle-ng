import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPageInfo } from '@commudle/shared-models';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-payment-logs',
  templateUrl: './payment-logs.component.html',
  styleUrls: ['./payment-logs.component.scss'],
})
export class PaymentLogsComponent implements OnInit, OnDestroy {
  eventDataFormEntityGroup: IEventDataFormEntityGroup[] = [];
  pageInfo: IPageInfo;
  total: number;
  subscriptions: Subscription[] = [];
  isLoading = false;
  constructor(private edfergService: EventDataFormEntityGroupsService) {}

  ngOnInit() {
    this.getEdfegList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
