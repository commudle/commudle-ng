import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

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

  searchForm: FormGroup;

  constructor(private edfergService: EventDataFormEntityGroupsService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getEdfegData();
    this.searchForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      this.page = 1;
      this.getEdfegData();
    });
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
      this.edfergService
        .getIndexByCommunity(this.communityId, this.page, this.count, this.searchForm.get('search').value)
        .subscribe((data) => {
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
      this.edfergService.getList(this.page, this.count, this.searchForm.get('search').value).subscribe((data) => {
        this.eventDataFormEntityGroup = data.event_data_form_entity_groups;
        this.total = data.total;
        this.page = data.page;
        this.count = data.count;
        this.isLoading = false;
      }),
    );
  }
}
