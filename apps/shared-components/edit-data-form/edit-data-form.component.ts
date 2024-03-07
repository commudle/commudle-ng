import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@commudle/shared-services';
import { NbMenuService } from '@commudle/theme';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IQuestion } from 'apps/shared-models/question.model';
import { IQuestionChoice } from 'apps/shared-models/question_choice.model';
import { IQuestionType } from 'apps/shared-models/question_type.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'commudle-edit-data-form',
  templateUrl: './edit-data-form.component.html',
  styleUrls: ['./edit-data-form.component.scss'],
})
export class EditDataFormComponent implements OnInit {
  @Input() dataFormId: number;
  @Input() showNameDescriptionFiled = true;
  @Input() centerLayout = true;
  @Output() updateFormDataEvent: EventEmitter<any> = new EventEmitter<any>();

  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  dataForm: IDataForm;
  questionTypes: IQuestionType[];

  questionContextMenuIndex = -1;

  editDataForm: FormGroup;

  questionDescription = [];
  menuItem = [
    { title: 'Add Question Below', icon: 'plus-circle-outline' },
    { title: 'Delete Question', icon: 'trash-outline' },
  ];

  tinyMCE: any = {
    placeholder: '(Optional)',
    min_height: 100,
    menubar: false,
    convert_urls: false,
    statusbar: false,
    toolbar: false,
    plugins: 'autoresize',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 14px !important;}",
  };

  @ViewChild('cdkDrag') cdkDrag: any;

  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService: SeoService,
    private NbmenuService: NbMenuService,
  ) {}

  get questions() {
    return this.editDataForm.get('data_form').get('questions') as FormArray;
  }

  get question_choices() {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.seoService.noIndex(true);
    this.questionDescription[0] = false;
    this.handleContextMenu();

    // get the question types
    this.activatedRoute.data.subscribe((data) => {
      this.questionTypes = data.questionTypes.question_types;
    });

    // initiate the form
    this.editDataForm = this.fb.group({
      data_form: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: [''],
        questions: this.fb.array([]),
      }),
    });

    // set the controls
    this.dataFormsService.getDataFormDetails(this.dataFormId).subscribe((dataForm) => {
      this.dataForm = dataForm;
      this.seoService.setTitle(`Edit ${this.dataForm.name} Form`);
      this.fillExistingDataForm();
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }
  // drag and drop function by CDK
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.editDataForm['controls'].data_form['controls'].questions['controls'],
      event.previousIndex,
      event.currentIndex,
    );
  }

  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: [1, Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [false],
      disabled: [false],
      has_responses: [false],
      question_choices: this.fb.array([]),
      show_description: [false],
    });
  }

  initQuestionChoice(): FormGroup {
    return this.fb.group({
      id: [''],
      title: ['', Validators.required],
      has_responses: [false],
    });
  }

  addQuestionButtonClick(index: number) {
    (this.editDataForm.get('data_form').get('questions') as FormArray).insert(index, this.initQuestion());
    this.questionDescription[index] = false;
  }

  addQuestionChoiceButtonClick(questionIndex: number) {
    (<FormArray>(
      (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
    )).push(this.initQuestionChoice());
  }

  removeQuestionButtonClick(questionIndex: number) {
    (this.editDataForm.get('data_form').get('questions') as FormArray).removeAt(questionIndex);
    this.questionDescription.splice(questionIndex, questionIndex + 1);
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (<FormArray>(
      (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
    )).removeAt(choiceIndex);
  }

  questionTypeChange(questionType, questionIndex: number) {
    if (![4, 5].includes(questionType.target.value)) {
      const choiceCount = (<FormArray>(
        (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
      )).length;
      for (let i = 0; i < choiceCount; i++) {
        (<FormArray>(
          (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get(
            'question_choices',
          )
        )).removeAt(0);
      }
    }
  }

  submitButtonText() {
    return this.editDataForm.valid ? 'Save' : 'Form Is Incomplete';
  }

  fillExistingDataForm() {
    this.editDataForm.get('data_form').patchValue({
      id: this.dataForm.id,
      name: this.dataForm.name,
      description: this.dataForm.description,
    });
    (this.editDataForm.get('data_form') as FormGroup).setControl(
      'questions',
      this.setDataFormQuestions(this.dataForm.questions),
    );
  }

  setDataFormQuestions(questions: IQuestion[]): FormArray {
    const formArray = new FormArray([]);
    questions.forEach((q) => {
      const exisingQuestionForm = this.fb.group({
        id: q.id,
        question_type_id: [{ value: q.question_type_id, disabled: q.has_responses }],
        title: [q.title],
        description: [q.description],
        required: [q.required],
        disabled: [q.disabled],
        has_responses: q.has_responses,
        question_choices: this.fb.array([this.initQuestionChoice()]),
        show_description: [q.description ? true : false],
      });
      (exisingQuestionForm as FormGroup).setControl('question_choices', this.setQuestionChoices(q.question_choices));
      formArray.push(exisingQuestionForm);
    });
    return formArray;
  }

  setQuestionChoices(questionChoices: IQuestionChoice[]): FormArray {
    const formArray = new FormArray([]);
    questionChoices.forEach((qc) => {
      formArray.push(
        this.fb.group({
          id: [qc.id],
          title: [qc.title],
          has_responses: qc.has_responses,
        }),
      );
    });

    return formArray;
  }

  updateDataForm() {
    if (this.editDataForm.invalid) {
      this.editDataForm.markAllAsTouched();
      return;
    }

    this.updateFormDataEvent.emit(this.editDataForm.get('data_form').value);
  }

  cloneCommunityDataForm() {
    this.dataFormsService.cloneCommunityForm(this.dataForm.id).subscribe((data) => {
      this.router.navigate(['/forms', data.id, 'edit']);
      this.toastLogService.successDialog('Form Cloned!');
    });
  }

  toggleDescriptionField(index: number): void {
    const questionFormGroup = this.editDataForm.get('data_form').get('questions') as FormArray;
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
