import { Component, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { EDataFormParentTypes, IDataForm } from 'projects/shared-models/data_form.model';
import { IQuestion } from 'projects/shared-models/question.model';
import { IQuestionChoice } from 'projects/shared-models/question_choice.model';
import { IQuestionType } from 'projects/shared-models/question_type.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-data-form',
  templateUrl: './edit-data-form.component.html',
  styleUrls: ['./edit-data-form.component.scss'],
})
export class EditDataFormComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  dataForm: IDataForm;
  questionTypes: IQuestionType[];

  editDataForm: FormGroup;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;

  cloned;

  @ViewChild('cdkDrag') cdkDrag: any;

  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService: SeoService,
    private renderer: Renderer2,
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
    this.activatedRoute.params.subscribe((data) => {
      this.dataFormsService.getDataFormDetails(data.id).subscribe((dataForm) => {
        this.dataForm = dataForm;
        this.seoService.setTitle(`Edit ${this.dataForm.name} Form`);
        this.fillExistingDataForm();
      });
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
  dragStart(Event) {
    const rect = Event.source.element.nativeElement.getBoundingClientRect();
    console.log(rect);

    // initialize start X coord
    this.startX = rect.x;
    // initialize start Y coord
    this.startY = rect.y;
  }

  dragMoved(event, action, index) {
    this.currentX = event.event.clientX;
    this.currentY = event.event.clientY;
    // logic to set startX and startY
    // TRYING TO CHANGE CARD BORDER COLOR IF this.endX - this.startX > some number
    if (this.startX > this.currentX) {
      console.log(this.cdkDrag);
      this.renderer.setStyle(this.cdkDrag.nativeElement, 'border-style', 'solid');
      this.renderer.setStyle(this.cdkDrag.nativeElement, 'border-color', 'red');
    }
    // console.log(this.cdkDrag.nativeElement);
    // this.cloned = document.getElementsByClassName('drag-button')[1];
    // this.cloned.style.backgroundColor = 'red';
    // console.log(this.cloned.style.backgroundColor);
    // event.source.element.nativeElement.style.backgroundColor = 'red';
    // console.log(event.source.element.nativeElement.style.backgroundColor);
    // console.log(this.elementDragged);
    // console.log(index);
  }

  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [false],
      disabled: [false],
      has_responses: [false],
      question_choices: this.fb.array([]),
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
  }

  addQuestionChoiceButtonClick(questionIndex: number) {
    (<FormArray>(
      (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
    )).push(this.initQuestionChoice());
  }

  removeQuestionButtonClick(questionIndex: number) {
    (this.editDataForm.get('data_form').get('questions') as FormArray).removeAt(questionIndex);
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (<FormArray>(
      (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
    )).removeAt(choiceIndex);
  }

  questionTypeChange(questionType, questionIndex: number) {
    if (![4, 5].includes(questionType)) {
      let choiceCount = (<FormArray>(
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
        title: [{ value: q.title, disabled: q.has_responses }],
        description: [{ value: q.description, disabled: q.has_responses }],
        required: [q.required],
        disabled: [q.disabled],
        has_responses: q.has_responses,
        question_choices: this.fb.array([this.initQuestionChoice()]),
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
          title: [{ value: qc.title, disabled: qc.has_responses }],
          has_responses: qc.has_responses,
        }),
      );
    });

    return formArray;
  }

  updateDataForm() {
    this.dataFormsService.updateDataForm(this.editDataForm.getRawValue().data_form).subscribe((dataForm) => {
      this.dataForm = dataForm;
      this.fillExistingDataForm();
      this.toastLogService.successDialog('Updated!');

      switch (this.dataForm.parent_type) {
        case EDataFormParentTypes.community: {
          this.router.navigate(['/admin/communities', this.dataForm.parent_id, 'forms']);
          break;
        }
        case EDataFormParentTypes.adminSurvey: {
          this.router.navigate(['/sys-admin/admin-surveys']);
        }
      }
    });
  }

  cloneCommunityDataForm() {
    this.dataFormsService.cloneCommunityForm(this.dataForm.id).subscribe((data) => {
      this.router.navigate(['/forms', data.id, 'edit']);
      this.toastLogService.successDialog('Form Cloned!');
    });
  }
}
