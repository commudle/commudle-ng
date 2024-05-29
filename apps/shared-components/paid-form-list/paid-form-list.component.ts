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
  total: number;
  subscriptions: Subscription[] = [];
  isLoading = false;
  page = 1;
  count = 10;

  constructor(private edfergService: EventDataFormEntityGroupsService) {}

  ngOnInit() {
    this.getEdfegData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getEdfegData() {
    if (this.communityId) {
      this.getEdfegListByCommunity();
    } else {
      this.getEdfegList();
    }
  }

  getEdfegListByCommunity() {
    this.isLoading = true;
    this.subscriptions.push(
      this.edfergService.getIndexByCommunity(this.communityId, this.page, this.count).subscribe((data) => {
        this.eventDataFormEntityGroup = data.event_data_form_entity_groups;
        this.total = data.total;
        this.page = data.page;
        this.count = data.count;
        this.isLoading = false;
      }),
    );
  }
  getEdfegList() {
    this.isLoading = true;
    this.subscriptions.push(
      this.edfergService.getList(this.page, this.count).subscribe((data) => {
        this.eventDataFormEntityGroup = data.event_data_form_entity_groups;
        this.total = data.total;
        this.page = data.page;
        this.count = data.count;
        this.isLoading = false;
      }),
    );
  }
}
