import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SurveysService } from '@commudle/shared-services';
import { NbDialogService, NbWindowService } from '@commudle/theme';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { FormResponsesComponent } from 'apps/shared-components/form-responses/form-responses.component';
import { ISurvey, ESurveyStatus } from 'apps/shared-models/survey.model';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent implements OnInit, OnDestroy {
  @Input() parentId: number;
  @Input() parentType: 'CommunityGroup' | 'Kommunity';
  surveys: ISurvey[];
  ESurveyStatus = ESurveyStatus;
  dataForms: IDataForm[] = [];
  createSurveyForm;
  newDataFormWindowRef;
  isLoading = true;
  subscriptions: Subscription[] = [];

  @ViewChild('newCommunitySurveyForm') newCommunitySurveyForm: TemplateRef<any>;

  constructor(
    private surveysService: SurveysService,
    private toastLogService: LibToastLogService,
    private dialogService: NbDialogService,
    private dataFormsService: DataFormsService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
  ) {
    this.createSurveyForm = this.fb.group({
      survey: this.fb.group({
        name: ['', Validators.required],
        data_form_id: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.getSurveys();
    this.getDataForms();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getSurveys() {
    this.subscriptions.push(
      this.surveysService.getSurveys(this.parentId, this.parentType).subscribe((data) => {
        this.surveys = data.surveys;
        this.isLoading = false;
      }),
    );
  }

  updateStatus(status, index) {
    status = status ? ESurveyStatus.open : ESurveyStatus.closed;
    this.surveysService.updateStatus(status, this.surveys[index].id).subscribe((data) => {
      this.surveys[index].status = status;
      this.toastLogService.successDialog(`This form was now ${status}`, 2000);
    });
  }

  toggleMultiResponse(index) {
    this.surveysService.toggleMultiResponse(this.surveys[index].id).subscribe((data) => {
      this.surveys[index].multi_response = data;
      this.toastLogService.successDialog(`Multiple Responses for this form was ${data}`, 2000);
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getDataForms() {
    this.subscriptions.push(
      this.dataFormsService.getDataFormList(this.parentId, this.parentType).subscribe((data) => {
        this.dataForms = data.data_forms;
      }),
    );
  }

  createNewSurvey() {
    this.isLoading = true;
    const formData = this.createSurveyForm.get('survey').value;
    this.subscriptions.push(
      this.surveysService
        .createNewSurvey(formData, formData.data_form_id, this.parentId, this.parentType)
        .subscribe((data) => {
          this.surveys.unshift(data);
          this.toastLogService.successDialog('Form Created');
          this.createSurveyForm.reset();
          this.createSurveyForm.get('survey').get('data_form_id').setValue('');
          this.isLoading = false;
        }),
    );
  }

  openNewFormWindow() {
    this.newDataFormWindowRef = this.windowService.open(this.newCommunitySurveyForm, {
      title: 'Create New Survey Form',
      context: {
        minQuestionCount: 1,
      },
      windowClass: 'form-window',
    });
  }

  createAndSelectForm(newFormData) {
    this.newDataFormWindowRef.close();
    this.dataFormsService.createDataForm(newFormData, this.parentId, this.parentType).subscribe((dataForm) => {
      this.dataForms.unshift(dataForm);

      setTimeout(() => {
        this.createSurveyForm.get('survey').get('data_form_id').setValue(dataForm.id);
      }, 0);
      this.toastLogService.successDialog('New Form Created & Selected!');
    });
  }

  openResponses(survey: ISurvey) {
    this.windowService.open(FormResponsesComponent, {
      title: `Survey ${survey.name} Responses`,
      context: {
        dataFormId: survey.data_form_entity.data_form_id,
      },
      windowClass: 'full-screen-width',
    });
  }
}
