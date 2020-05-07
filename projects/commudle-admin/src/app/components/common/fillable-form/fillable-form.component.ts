import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EQuestionTypes } from 'projects/shared-models/enums/question_types.enum';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { DataFormEntityResponsesService } from '../../../services/data-form-entity-responses.service';
import { DataFormsService } from '../../../services/data_forms.service';
import { FormBuilder, Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { IDataFormEntity } from 'projects/shared-models/data_form_entity.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Component({
  selector: 'app-fillable-form',
  templateUrl: './fillable-form.component.html',
  styleUrls: ['./fillable-form.component.scss']
})
export class FillableFormComponent implements OnInit {
  formClosed = false;
  EQuestionTypes = EQuestionTypes;

  @Input() dataFormEntity: IDataFormEntity;

  existingResponses;
  dataForm: IDataForm;

  @Output() formSubmitted = new EventEmitter();

  dataFormEntityResponseForm = this.fb.group({});

  constructor(
    private dataFormEntityResponsesService: DataFormEntityResponsesService,
    private dataFormsService: DataFormsService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {

    this.getExistingResponses();
  }

  getExistingResponses() {
    this.dataFormEntityResponsesService.getExistingResponse(this.dataFormEntity.id).subscribe(
      data => {
        if (data.form_closed === true) {
          this.formClosed = data.form_closed;
        } else {
          this.existingResponses = data.existing_responses;
          this.getDataForm(data.data_form_id);
        }
      }
    );
  }

  getDataForm(dataFormId) {
    this.dataFormsService.getDataFormDetails(dataFormId).subscribe(
      data => {
        this.dataForm = data;
        if (this.existingResponses) {
          this.prefillResponses();
        }
      }
    );
  }

  getDataFormQuestion(questionId) {
    return this.dataForm.questions.find(question => question.id === questionId);
  }


  prefillResponses() {

    for (const q of this.dataForm.questions) {
      let validators = [];
      if (q.required) {
        validators = [Validators.required];
      }
      if (
        [
          EQuestionTypes.LONG_ANSWER,
          EQuestionTypes.NUMBER,
          EQuestionTypes.SHORT_ANSWER,
          EQuestionTypes.SINGLE_CHOICE
        ].includes(q.question_type_id)) {
        const filledValue = (this.existingResponses[`${q.id}`] || '');
        this.dataFormEntityResponseForm.addControl(
          `${q.id}`, this.fb.control(filledValue, validators)
        );
      } else if (EQuestionTypes.MULTIPLE_CHOICE === q.question_type_id) {

        // create a custom validator for checkboxes
        this.dataFormEntityResponseForm.addControl(
          `${q.id}`, this.fb.group({})
        );

        for (let qc of q.question_choices) {

          const filledValue = ((this.existingResponses[`${q.id}`] && this.existingResponses[`${q.id}`].includes(qc.id)) ? true : false);
          (this.dataFormEntityResponseForm['controls'][`${q.id}`] as FormGroup).addControl(
            `${qc.id}`, this.fb.control(filledValue)
          );
        }

        if (q.required) {
          this.dataFormEntityResponseForm.controls[`${q.id}`].setValidators(this.multipleChoiceValidator(q.question_choices));
        }
      }
    }
  }


  multipleChoiceValidator(questionChoices): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      let allFalse = true;
      for (let ch of questionChoices) {
        if (group.controls[ch.id].value === true) {
          allFalse = false;
          break;
        }
      }

      if (allFalse) {
        group.controls[questionChoices[0].id].setErrors({required: true});
      } else {
        group.controls[questionChoices[0].id].setErrors(null);
      }
      return;
    };
  }


  submitForm() {
    this.dataFormEntityResponsesService.submitDataFormEntityResponse(this.dataFormEntity.id, this.dataFormEntityResponseForm.value).subscribe(
      data => {
        this.toastLogService.successDialog("Saved!");
        this.formSubmitted.emit(true);
      }
    );
  }

}
