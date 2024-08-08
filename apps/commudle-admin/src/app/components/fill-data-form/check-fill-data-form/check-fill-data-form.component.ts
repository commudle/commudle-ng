import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  event_slug: string;
  kommunity_slug: string;

  @ViewChild('formClosedDialog', { static: true }) formClosedDialog: TemplateRef<any>;
  @ViewChild('alreadyExistDfe', { static: true }) alreadyExistDfe: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private dialogService: NbDialogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.dataFormEntitiesService.getDataFormEntity(params.data_form_entity_id).subscribe((data) => {
          this.dataFormEntity = data;
          this.formClosed = !this.dataFormEntity.user_can_fill_form; // this will always return true for organizers
          if (
            this.dataFormEntity.form_type.form_type_name === 'attendee' ||
            this.dataFormEntity.form_type.form_type_name === 'speaker'
          ) {
            this.checkAlreadyFilledEntryPassForm(params.data_form_entity_id);
          }
          if (!this.formClosed) {
            this.checkFormStatus(params.data_form_entity_id);
          }
        });
      }),
    );
  }

  checkFormStatus(dataFormId) {
    this.intervalSubscription = interval(2000).subscribe(() => {
      this.dataFormEntitiesService.checkFormStatus(dataFormId).subscribe((data) => {
        if (!data.form_open) {
          this.clearInterval();
          const dialogRef = this.dialogService.open(this.formClosedDialog, {
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

  checkAlreadyFilledEntryPassForm(dataFormId) {
    this.subscriptions.push(
      this.dataFormEntitiesService.checkAlreadyFilledEntryPassForm(dataFormId).subscribe((data) => {
        this.event_slug = data.event.slug;
        this.kommunity_slug = data.event.kommunity_slug;
        if (data.filled_another_form) {
          this.dialogService.open(this.alreadyExistDfe, { context: data });
        }
      }),
    );
  }

  redirectToEvent() {
    this.router.navigate(['communities', this.kommunity_slug, 'events', this.event_slug]);
  }
}
