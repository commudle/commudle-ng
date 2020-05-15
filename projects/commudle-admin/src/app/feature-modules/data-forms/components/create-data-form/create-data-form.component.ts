import { Component, OnInit } from '@angular/core';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup, Form } from '@angular/forms';
import { IQuestionType } from 'projects/shared-models/question_type.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-data-form',
  templateUrl: './create-data-form.component.html',
  styleUrls: ['./create-data-form.component.scss']
})
export class CreateDataFormComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  parentType;
  parentId;
  dataForm: IDataForm;
  questionTypes: IQuestionType[];


  // define the form
  createDataForm: FormGroup;


  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [false],
      disabled: [false],
      has_responses: [false],
      question_choices: this.fb.array([

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
    (this.createDataForm.get('data_form').get('questions') as FormArray).push(this.initQuestion());
  }


  addQuestionChoiceButtonClick(questionIndex: number) {
    (<FormArray>(<FormArray>this.createDataForm.get('data_form').get('questions'))
    .controls[questionIndex].get('question_choices')).push(this.initQuestionChoice());

  }

  removeQuestionButtonClick(questionIndex: number) {
    (this.createDataForm.get('data_form').get('questions') as FormArray).removeAt(questionIndex);
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (<FormArray>(<FormArray>this.createDataForm.get('data_form').get('questions'))
    .controls[questionIndex].get('question_choices')).removeAt(choiceIndex);
  }

  get questions() {
    return this.createDataForm.get('data_form').get('questions') as FormArray;
  }

  get question_choices() {
    return this.fb.group({
      title: ['', Validators.required]
    });
  }

  submitButtonText() {
    return (this.createDataForm.valid ? "Save" : "Form Is Incomplete");
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
    this.titleService.setTitle('New Form');
    // get the parent values
    this.activatedRoute.queryParams.subscribe(params => {
      this.parentType = params['parent_type'];
      this.parentId = params['parent_id'];
    });

    // get the question types
    this.activatedRoute.data.subscribe((data) => {
      this.questionTypes = data.questionTypes.question_types;
    });

    // initiate the form
    this.createDataForm = this.fb.group({
      data_form: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        questions: this.fb.array([

        ])
      })
    });
  }

  saveDataForm() {

    this.dataFormsService.createDataForm(this.createDataForm.get('data_form').value, this.parentId, this.parentType).subscribe((dataForm => {
      this.toastLogService.successDialog('New Form Created!');
this.router.navigate(['/admin/communities', this.parentId]);    }));
  }

}
