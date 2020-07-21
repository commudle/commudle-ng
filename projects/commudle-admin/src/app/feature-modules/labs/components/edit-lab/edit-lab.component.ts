import { Component, OnInit } from '@angular/core';
import { faFlask, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { LabsService } from '../../services/labs.service';
import { ActivatedRoute } from '@angular/router';
import { ILab } from 'projects/shared-models/lab.model';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

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

  uploadedHeaderImage;
  uploadedHeaderImageFile: File;



  headerImageForm = this.fb.group({
    header_image: ['', Validators.required],
  });
  labForm: FormGroup;


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

  removeStep(stepIndex: number) {
    (this.labForm.get('lab_steps') as FormArray).removeAt(stepIndex);
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private labsService: LabsService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {

    this.labForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lab_steps: this.fb.array([])
    });

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


  // Header image functionality
  displaySelectedHeaderImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2425190) {
        this.toastLogService.warningDialog('Image should be less than 2 Mb', 3000);
        return;
      }
      this.uploadedHeaderImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedHeaderImage = reader.result;
      };

      reader.readAsDataURL(file);
      this.updateHeaderImage();
    }

  }

  updateHeaderImage() {
    const formData: any = new FormData();
    formData.append('header_image', this.uploadedHeaderImageFile);
    this.labsService.updateHeaderImage(this.lab.id, formData).subscribe(
      data => {
        this.lab.header_image = data;
        this.toastLogService.successDialog('Updated!');
      }
    );
  }

  deleteEventHeader() {
    this.labsService.deleteHeaderImage(this.lab.id).subscribe(
      data => {
        this.uploadedHeaderImage = null;
        this.lab.header_image = null;
        this.toastLogService.successDialog('Deleted');
      }
    );
  }

}
