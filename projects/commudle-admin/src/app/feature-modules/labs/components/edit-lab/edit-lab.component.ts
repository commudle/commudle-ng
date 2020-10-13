import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { faFlask, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { LabsService } from '../../services/labs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ILab, EPublishStatus } from 'projects/shared-models/lab.model';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss']
})
export class EditLabComponent implements OnInit {
  faFlask = faFlask;
  faPlus = faPlusCircle;
  EPublishStatus = EPublishStatus;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  autoSaving = false;

  labId;
  lab: ILab;

  uploadedHeaderImage;
  uploadedHeaderImageFile: File;
  imagesList = [];

  tags = '';


  headerImageForm = this.fb.group({
    header_image: ['', Validators.required],
  });
  labForm: FormGroup;



  initStep(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      publish_status: []
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
    private toastLogService: LibToastLogService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lab_steps: this.fb.array([]),
      publish_status: []
    });

    this.activatedRoute.params.subscribe(
      data => {
        this.labId = data.lab_id;
        this.getLab();
      }
    );
  }

  setMeta() {
    this.meta.updateTag({
      name: 'description',
      content: this.lab.description.replace(/<[^>]*>/g, '')
    });
    this.title.setTitle(`Edit ${this.lab.name} | By ${this.lab.user.name}`);
    this.meta.updateTag(
      {
        name: 'og:image',
        content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({ name: 'og:title', content: `Edit ${this.lab.name} | By ${this.lab.user.name}` });
    this.meta.updateTag({
      name: 'og:description',
      content: this.lab.description.replace(/<[^>]*>/g, '')
    });
    this.meta.updateTag({ name: 'og:type', content: 'article'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({ name: 'twitter:title', content: `Edit ${this.lab.name} | By ${this.lab.user.name}` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: this.lab.description.replace(/<[^>]*>/g, '')
    });

  }


  getLab() {
    this.labsService.getLab(this.labId).subscribe(
      data => {
        this.lab = data;

        for (let img of this.lab.images) {
          this.imagesList.push({title: img.url, value: img.url});
        }
        this.setMeta();
        this.tags = data.tags.toString();
        this.prefillForm();
      }
    );
  }


  prefillForm() {
    if (this.lab) {
      this.labForm.patchValue({
        name: this.lab.name,
        description: this.lab.description,
        publish_status: this.lab.publish_status
      });

      if (this.lab.lab_steps) {
        (this.labForm as FormGroup).setControl('lab_steps', this.setLabFormSteps(this.lab.lab_steps));
      }

    }

    if (this.isBrowser) {
      setInterval(() => {
        this.autoSaveLab();
      }, 10000);
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


  // upload_inline_images
  uploadTextImage(blobInfo, success, failure) {
    const formData: any = new FormData();
    formData.append('image', blobInfo.blob());
    this.labsService.uploadTextImage(this.lab.id, formData).subscribe(
      data => {
        if (data) {
          this.imagesList.push({title: data, value: data});
          success(data);
        }
      }
    );
  }


  updateLab(publishStatus) {
    if (this.lab.publish_status !== EPublishStatus.published) {
      this.labForm.patchValue({
        publish_status: publishStatus
      });
    }
    this.labsService.updateLab(this.lab.slug, this.labForm.value).subscribe(
      data => {
        if (data) {
          this.lab = data;
          this.submitTags();
        }
      }
    );
  }


  //auto save every 30 seconds
  autoSaveLab() {
    this.autoSaving = true;
    this.labsService.updateLab(this.lab.slug, this.labForm.value).subscribe(
      data => {
        if (data) {
          this.lab = data;
          this.submitTags(false);
          this.autoSaving = false;
        }
      }
    );
  }

  // tags
  submitTags(redirect=true) {
    this.labsService.updateTags(this.lab.id, this.tags.split(',')).subscribe(
      data => {
        if (redirect) {
          this.toastLogService.successDialog('Saved!');
          this.router.navigate(['/labs/my-labs']);
        }
      }
    );
  }

}
