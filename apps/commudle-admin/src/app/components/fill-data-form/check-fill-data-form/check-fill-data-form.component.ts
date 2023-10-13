import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { IDataFormEntity } from 'apps/shared-models/data_form_entity.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-check-fill-data-form',
  templateUrl: './check-fill-data-form.component.html',
  styleUrls: ['./check-fill-data-form.component.scss'],
})
export class CheckFillDataFormComponent implements OnInit, OnDestroy {
  dataFormEntity: IDataFormEntity;
  subscriptions: Subscription[] = [];
  formClosed = false;
  constructor(private activatedRoute: ActivatedRoute, private dataFormEntitiesService: DataFormEntitiesService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.dataFormEntitiesService.getDataFormEntity(params.data_form_entity_id).subscribe((data) => {
          this.dataFormEntity = data;
          this.formClosed = !this.dataFormEntity.user_can_fill_form; // this will always return true for organizers
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
