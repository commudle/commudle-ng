import { Component, OnInit } from '@angular/core';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup, Form } from '@angular/forms';
import { IQuestion } from 'projects/shared-models/question.model';
import { IQuestionType } from 'projects/shared-models/question_type.model';
import { QuestionTypesResolver } from 'projects/shared-resolvers/question-types.resolver';
import { IQuestionChoice } from 'projects/shared-models/question_choice.model';

@Component({
  selector: 'app-edit-data-form',
  templateUrl: './edit-data-form.component.html',
  styleUrls: ['./edit-data-form.component.scss']
})
export class EditDataFormComponent implements OnInit {

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
      question_choices: this.fb.array([
        this.initQuestionChoice()
      ])
    });
  }


  initQuestionChoice(): FormGroup {
    return this.fb.group({
      id: [''],
      title: ['', Validators.required],
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


  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
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
        question_type_id: q.question_type_id,
        title: q.title,
        description: q.description,
        required: q.required,
        disabled: q.disabled,
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
        title: qc.title
      }));
      console.log(qc.title);
    });

    return formArray;
  }


}
