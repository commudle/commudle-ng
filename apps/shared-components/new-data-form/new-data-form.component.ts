import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { FormBuilder, Validators, FormArray, FormGroup, Form } from '@angular/forms';
import { IQuestionType } from 'apps/shared-models/question_type.model';
import { QuestionTypesService } from 'apps/shared-components/services/question-types.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NbMenuService } from '@commudle/theme';
import { filter, map } from 'rxjs/operators';

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
  @Input() stickSubmitButtonBottom = false;
  @Input() showNameDescriptionFiled = true;
  @Input() formName: string = '';

  @Output() newDataForm = new EventEmitter();

  showNameField = true;
  showQuestionRequiredField = true;
  showQuestionDisabledField = true;
  showQuestionDescriptionField = false;

  questionContextMenuIndex = -1;

  totalQuestions = 0;
  questionDescription = [];

  menuItem = [
    {
      title: 'Add Question Below',
      icon: 'plus-circle-outline',
    },
    { title: 'Delete Question', icon: 'trash-outline' },
  ];

  // define the form
  createDataForm: FormGroup;

  tinyMCE: any = {
    placeholder: '(Optional)',
    min_height: 100,
    menubar: false,
    convert_urls: false,
    statusbar: false,
    toolbar: false,
    plugins: 'autoresize',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
  };

  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: [1, Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [this.defaultQuestionRequiredValue()],
      disabled: [false],
      has_responses: [false],
      question_choices: this.fb.array([]),
      show_description: [false],
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
    this.questionDescription[index] = false;
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
    this.questionDescription.splice(questionIndex, questionIndex + 1);
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (
      (this.createDataForm.get('data_form').get('questions') as FormArray).controls[questionIndex].get(
        'question_choices',
      ) as FormArray
    ).removeAt(choiceIndex);
  }

  questionTypeChange(questionType, questionIndex: number) {
    if (![4, 5].includes(questionType.target.value)) {
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

  constructor(
    private fb: FormBuilder,
    private questionTypesService: QuestionTypesService,
    private NbmenuService: NbMenuService,
  ) {}

  ngOnInit() {
    this.questionDescription[0] = false;

    // get the question types
    this.questionTypesService.getQuestionTypes().subscribe((data) => {
      this.questionTypes = data.question_types;
    });

    // initiate the form
    this.createDataForm = this.fb.group({
      data_form: this.fb.group({
        id: [''],
        name: [this.formName, Validators.required],
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

    this.handleContextMenu();
  }

  saveDataForm() {
    if (this.createDataForm.invalid) {
      this.createDataForm.markAllAsTouched();
      return;
    }
    this.newDataForm.emit(this.createDataForm.get('data_form').value);
  }

  toggleDescriptionField(index: number): void {
    const questionFormGroup = this.createDataForm.get('data_form').get('questions') as FormArray;
    const question = questionFormGroup.at(index);
    const show_description = question?.get('show_description')?.value;
    question.patchValue({ show_description: !show_description });
  }

  setContextIndex(index: number) {
    this.questionContextMenuIndex = index;
  }

  handleContextMenu(): void {
    this.NbmenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === `data-form-question-context-menu-${this.questionContextMenuIndex}`),
        map(({ item: title }) => title),
      )
      .subscribe((menu) => {
        switch (menu.title) {
          case 'Add Question Below':
            this.addQuestionButtonClick(this.questionContextMenuIndex + 1);
            break;

          case 'Delete Question':
            this.removeQuestionButtonClick(this.questionContextMenuIndex);
            break;
        }
      });
  }
}
