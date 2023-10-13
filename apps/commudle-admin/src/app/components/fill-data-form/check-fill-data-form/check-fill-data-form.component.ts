import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { IDataFormEntity } from 'apps/shared-models/data_form_entity.model';
import { Subscription, interval } from 'rxjs';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService } from '@commudle/theme';
@Component({
  selector: 'commudle-check-fill-data-form',
  templateUrl: './check-fill-data-form.component.html',
  styleUrls: ['./check-fill-data-form.component.scss'],
})
export class CheckFillDataFormComponent implements OnInit, OnDestroy {
  dataFormEntity: IDataFormEntity;
  subscriptions: Subscription[] = [];
  formClosed = false;
  intervalSubscription: Subscription;
  faTriangleExclamation = faTriangleExclamation;

  @ViewChild('paymentErrorDialog', { static: true }) paymentErrorDialog: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.checkFormStatus(params.data_form_entity_id);
        this.dataFormEntitiesService.getDataFormEntity(params.data_form_entity_id).subscribe((data) => {
          this.dataFormEntity = data;
          this.formClosed = !this.dataFormEntity.user_can_fill_form; // this will always return true for organizers
        });
      }),
    );
  }

  checkFormStatus(dataFormId) {
    this.intervalSubscription = interval(2000).subscribe(() => {
      this.dataFormEntitiesService.checkFormStatus(dataFormId).subscribe((data) => {
        if (!data.form_open) {
          this.clearInterval();
          const dialogRef = this.dialogService.open(this.paymentErrorDialog, {
            closeOnBackdropClick: false,
            closeOnEsc: false,
            hasScroll: false,
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.clearInterval();
  }

  clearInterval() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
