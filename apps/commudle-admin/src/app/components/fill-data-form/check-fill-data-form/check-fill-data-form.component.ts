import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-check-fill-data-form',
  templateUrl: './check-fill-data-form.component.html',
  styleUrls: ['./check-fill-data-form.component.scss'],
})
export class CheckFillDataFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        // this.getDataFormEntity(params.data_form_entity_id);
        this.dataFormEntitiesService.getDataFormEntity(params.data_form_entity_id).subscribe((data) => {});
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  // getEventDataFormEntityGroups() {
  //   this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(this.event.id).subscribe((data) => {
  //     this.eventDataFormEntityGroups = data.event_data_form_entity_groups;
  //   });
  // }
}
