import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { EQuestionTypes } from 'apps/shared-models/enums/question_types.enum';
import { IQuestion } from 'apps/shared-models/question.model';
import { SDataFormsService } from '../services/s-data-forms.service';

@Component({
  selector: 'app-data-form-fill',
  templateUrl: './data-form-fill.component.html',
  styleUrls: ['./data-form-fill.component.scss'],
})
export class DataFormFillComponent implements OnInit, OnChanges {
  formClosed = false;
  EQuestionTypes = EQuestionTypes;

  @Input() existingResponses;
  @Input() dataFormId;
  dataForm: IDataForm;
  formCreated = false;
  enabledQuestions: IQuestion[] = [];

  @Output() formSubmitted = new EventEmitter();

  dataFormEntityResponseForm;

  constructor(private dataFormsService: SDataFormsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getDataForm();
  }

  ngOnChanges() {
    this.getDataForm();
  }

  getDataForm() {
    this.dataFormsService.getDataFormDetails(this.dataFormId).subscribe((data) => {
      this.dataForm = data;
      this.enabledQuestions = this.dataForm.questions.filter((obj) => {
        return obj.disabled === false;
      });
      this.createFormAndPrefillResponses();
      this.formCreated = true;
    });
  }

  createFormAndPrefillResponses() {
    this.dataFormEntityResponseForm = this.fb.group({});
    for (const q of this.enabledQuestions) {
      let validators = [];
      if (q.required) {
        validators = [Validators.required];
      }
      if (
        [
          EQuestionTypes.LONG_ANSWER,
          EQuestionTypes.NUMBER,
          EQuestionTypes.SHORT_ANSWER,
          EQuestionTypes.SINGLE_CHOICE,
        ].includes(q.question_type_id)
      ) {
        const filledValue = (this.existingResponses && this.existingResponses[`${q.id}`]) || '';
        this.dataFormEntityResponseForm.addControl(`${q.id}`, this.fb.control(filledValue, validators));
      } else if (EQuestionTypes.MULTIPLE_CHOICE === q.question_type_id) {
        // create a custom validator for checkboxes
        this.dataFormEntityResponseForm.addControl(`${q.id}`, this.fb.group({}));

        for (const qc of q.question_choices) {
          const filledValue = !!(
            this.existingResponses &&
            this.existingResponses[`${q.id}`] &&
            this.existingResponses[`${q.id}`].includes(qc.id)
          );
          (this.dataFormEntityResponseForm['controls'][`${q.id}`] as FormGroup).addControl(
            `${qc.id}`,
            this.fb.control(filledValue),
          );
        }

        if (q.required) {
          this.dataFormEntityResponseForm.controls[`${q.id}`].setValidators(
            this.multipleChoiceValidator(q.question_choices),
          );
        }
      }
    }
  }

  multipleChoiceValidator(questionChoices): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      let allFalse = true;
      for (const ch of questionChoices) {
        if (group.controls[ch.id].value === true) {
          allFalse = false;
          break;
        }
      }

      if (allFalse) {
        group.controls[questionChoices[0].id].setErrors({ required: true });
      } else {
        group.controls[questionChoices[0].id].setErrors(null);
      }
      return;
    };
  }

  submitForm() {
    this.formSubmitted.emit(this.dataFormEntityResponseForm.value);
  }
}
