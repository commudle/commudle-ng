import { Component, OnInit } from '@angular/core';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup, Form } from '@angular/forms';
import { IQuestion } from 'projects/shared-models/question.model';
import { IQuestionType } from 'projects/shared-models/question_type.model';
import { IQuestionChoice } from 'projects/shared-models/question_choice.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-data-form',
  templateUrl: './edit-data-form.component.html',
  styleUrls: ['./edit-data-form.component.scss']
})
export class EditDataFormComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  dataForm: IDataForm;
  questionTypes: IQuestionType[];


  // define the form
  editDataForm: FormGroup;


  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [''],
      disabled: [''],
      has_responses: [false],
      question_choices: this.fb.array([
        this.initQuestionChoice()
      ])
    });
  }


  initQuestionChoice(): FormGroup {
    return this.fb.group({
      id: [''],
      title: ['', Validators.required],
      has_responses: [false]
    });
  }

  addQuestionButtonClick() {
    (this.editDataForm.get('data_form').get('questions') as FormArray).push(this.initQuestion());
  }


  addQuestionChoiceButtonClick(questionIndex: number) {
    (<FormArray>(<FormArray>this.editDataForm.get('data_form').get('questions'))
    .controls[questionIndex].get('question_choices')).push(this.initQuestionChoice());

  }

  removeQuestionButtonClick(questionIndex: number) {
    (this.editDataForm.get('data_form').get('questions') as FormArray).removeAt(questionIndex);
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (<FormArray>(<FormArray>this.editDataForm.get('data_form').get('questions'))
    .controls[questionIndex].get('question_choices')).removeAt(choiceIndex);
  }

  get questions() {
    return this.editDataForm.get('data_form').get('questions') as FormArray;
  }

  get question_choices() {
    return this.fb.group({
      title: ['', Validators.required]
    });
  }

  submitButtonText() {
    return (this.editDataForm.valid ? "Save" : "Form Is Incomplete");
  }


  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    // get the question types
    this.activatedRoute.data.subscribe((data) => {
      this.questionTypes = data.questionTypes.question_types;
    });

    // initiate the form
    this.editDataForm = this.fb.group({
      data_form: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        questions: this.fb.array([
          this.initQuestion()
        ])
      })
    });

    // set the controls
    this.dataFormsService.getDataFormDetails(this.activatedRoute.snapshot.params['id']).subscribe(
      (dataForm) => {
        this.dataForm = dataForm;
        this.titleService.setTitle(`Edit ${this.dataForm.name} Form`);
        this.fillExistingDataForm();
      }
    );

  }

  fillExistingDataForm() {
    this.editDataForm.get('data_form').patchValue({
      id: this.dataForm.id,
      name: this.dataForm.name
    });
    (this.editDataForm.get('data_form') as FormGroup).setControl('questions', this.setDataFormQuestions(this.dataForm.questions));
  }


  setDataFormQuestions(questions: IQuestion[]): FormArray {
    const formArray = new FormArray([]);
    questions.forEach(q => {

      const exisingQuestionForm = this.fb.group({
        id: q.id,
        question_type_id: [{value: q.question_type_id, disabled: q.has_responses}],
        title: [{value: q.title, disabled: q.has_responses}],
        description: [{value: q.description, disabled: q.has_responses}],
        required: [{value: q.required, disabled: q.has_responses}],
        disabled: [{value: q.disabled, disabled: q.has_responses}],
        has_responses: q.has_responses,
        question_choices: this.fb.array([
          this.initQuestionChoice()
        ])
      });
      (exisingQuestionForm as FormGroup).setControl('question_choices', this.setQuestionChoices(q.question_choices));
      formArray.push(exisingQuestionForm);
    });
    return formArray;
  }


  setQuestionChoices(questionChoices: IQuestionChoice[]): FormArray {
    const formArray = new FormArray([]);
    questionChoices.forEach(qc => {
      formArray.push(this.fb.group({
        title: [{value: qc.title, disabled: qc.has_responses}],
        has_responses: qc.has_responses,
      }));
    });

    return formArray;
  }


  updateDataForm() {
    this.dataFormsService.updateDataForm(this.editDataForm.get('data_form').value).subscribe((dataForm => {
      this.dataForm = dataForm;
      this.fillExistingDataForm();
      this.toastLogService.successDialog('Updated!');
      this.router.navigate(['/admin/communities', this.dataForm.parent_id]);

    }));
  }


}
