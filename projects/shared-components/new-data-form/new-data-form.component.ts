import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { FormBuilder, Validators, FormArray, FormGroup, Form } from '@angular/forms';
import { IQuestionType } from 'projects/shared-models/question_type.model';
import { QuestionTypesService } from 'projects/shared-components/services/question-types.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

enum EFormPurposes {
  DATA_FORM = 'data_form',
  POLL = 'poll',
}

@Component({
  selector: 'app-new-data-form',
  templateUrl: './new-data-form.component.html',
  styleUrls: ['./new-data-form.component.scss'],
})
export class NewDataFormComponent implements OnInit {
  EFormPurposes = EFormPurposes;

  dataForm: IDataForm;
  questionTypes: IQuestionType[];

  @Input() maxQuestionCount;
  @Input() minQuestionCount;
  @Input() formPurpose;

  @Output() newDataForm = new EventEmitter();

  showNameField = true;
  showQuestionRequiredField = true;
  showQuestionDisabledField = true;
  showQuestionDescriptionField = true;

  totalQuestions = 0;

  // define the form
  createDataForm: FormGroup;

  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [this.defaultQuestionRequiredValue()],
      disabled: [false],
      has_responses: [false],
      question_choices: this.fb.array([]),
    });
  }
  //drag and drop function by CDK
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.createDataForm['controls'].data_form['controls'].questions['controls'],
      event.previousIndex,
      event.currentIndex,
    );
  }

  defaultQuestionRequiredValue() {
    if (this.formPurpose && this.formPurpose === EFormPurposes.POLL) {
      return true;
    }
    return false;
  }

  setFieldVisibilityDefaults() {
    switch (this.formPurpose) {
      case EFormPurposes.POLL: {
        this.showNameField = false;
        this.showQuestionRequiredField = false;
        this.showQuestionDisabledField = false;
        this.showQuestionDescriptionField = false;

        // remove required validation from name
        this.createDataForm.get('data_form').get('name').clearValidators();
        this.createDataForm.get('data_form').get('name').clearValidators();
        break;
      }
      default: {
        this.showNameField = true;
        this.showQuestionRequiredField = true;
        this.showQuestionDisabledField = true;
        this.showQuestionDescriptionField = true;
        break;
      }
    }
  }

  initQuestionChoice(): FormGroup {
    return this.fb.group({
      id: [''],
      title: ['', Validators.required],
      has_responses: [false],
    });
  }

  addQuestionButtonClick(index: number) {
    (this.createDataForm.get('data_form').get('questions') as FormArray).insert(index, this.initQuestion());
    this.updateQuestionsCount();
  }

  updateQuestionsCount() {
    this.totalQuestions = (this.createDataForm.get('data_form').get('questions') as FormArray).length;
  }

  addQuestionChoiceButtonClick(questionIndex: number) {
    (
      (this.createDataForm.get('data_form').get('questions') as FormArray).controls[questionIndex].get(
        'question_choices',
      ) as FormArray
    ).push(this.initQuestionChoice());
  }

  removeQuestionButtonClick(questionIndex: number) {
    (this.createDataForm.get('data_form').get('questions') as FormArray).removeAt(questionIndex);
    this.updateQuestionsCount();
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (
      (this.createDataForm.get('data_form').get('questions') as FormArray).controls[questionIndex].get(
        'question_choices',
      ) as FormArray
    ).removeAt(choiceIndex);
  }

  questionTypeChange(questionType, questionIndex: number) {
    if (![4, 5].includes(questionType)) {
      const choiceCount = (
        (this.createDataForm.get('data_form').get('questions') as FormArray).controls[questionIndex].get(
          'question_choices',
        ) as FormArray
      ).length;
      for (let i = 0; i < choiceCount; i++) {
        (
          (this.createDataForm.get('data_form').get('questions') as FormArray).controls[questionIndex].get(
            'question_choices',
          ) as FormArray
        ).removeAt(0);
      }
    }
  }

  get questions() {
    return this.createDataForm.get('data_form').get('questions') as FormArray;
  }

  get question_choices() {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  submitButtonText() {
    return this.createDataForm.valid ? 'Save' : 'Form Is Incomplete';
  }

  constructor(private fb: FormBuilder, private questionTypesService: QuestionTypesService) {}

  ngOnInit() {
    // get the question types
    this.questionTypesService.getQuestionTypes().subscribe((data) => {
      this.questionTypes = data.question_types;
    });

    // initiate the form
    this.createDataForm = this.fb.group({
      data_form: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: [''],
        questions: this.fb.array([]),
      }),
    });

    // if (this.showName === false) {
    //   this.createDataForm.get('data_form').patchValue({
    //     // name:
    //   });
    // }

    this.setFieldVisibilityDefaults();

    if (this.minQuestionCount && this.minQuestionCount > 0) {
      for (let i = 0; i < this.minQuestionCount; i++) {
        this.addQuestionButtonClick(i);
      }
    }
  }

  saveDataForm() {
    this.newDataForm.emit(this.createDataForm.get('data_form').value);
  }
}
