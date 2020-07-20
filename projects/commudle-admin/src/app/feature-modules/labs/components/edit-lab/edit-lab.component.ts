import { Component, OnInit } from '@angular/core';
import { faFlask, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { LabsService } from '../../services/labs.service';
import { ActivatedRoute } from '@angular/router';
import { ILab } from 'projects/shared-models/lab.model';
import { ILabStep } from 'projects/shared-models/lab-step.model';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss']
})
export class EditLabComponent implements OnInit {
  faFlask = faFlask;
  faPlus = faPlusCircle;

  labId;
  lab: ILab;


  labForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    lab_steps: this.fb.array([
    ])
  });


  initStep(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get steps() {
    return this.labForm.get('lab_steps') as FormArray;
  }

  addStep() {
    (this.labForm.get('lab_steps') as FormArray).push(this.initStep());
  }

  removeQuestionButtonClick(stepIndex: number) {
    (this.labForm.get('lab_steps') as FormArray).removeAt(stepIndex);
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private labsService: LabsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      data => {
        this.labId = data.lab_id;
        this.getLab();
      }
    );
  }


  getLab() {
    this.labsService.getLab(this.labId).subscribe(
      data => {
        this.lab = data;
        this.prefillForm();
      }
    );
  }


  prefillForm() {
    if (this.lab) {
      this.labForm.patchValue({
        name: this.lab.name,
        description: this.lab.description
      });

      if (this.lab.lab_steps) {
        (this.labForm as FormGroup).setControl('lab_steps', this.setLabFormSteps(this.lab.lab_steps));
      }

    }
  }


  setLabFormSteps(labSteps: ILabStep[]): FormArray {
    const formArray = new FormArray([]);
    labSteps.forEach(lStep => {
      const existingStepform = this.fb.group({
        id: lStep.id,
        name: [lStep.name],
        description: [lStep.description],
      });
      formArray.push(existingStepform);
    });
    return formArray;
  }

}
