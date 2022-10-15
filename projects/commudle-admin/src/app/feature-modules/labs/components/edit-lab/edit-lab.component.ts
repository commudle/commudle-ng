import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LabsService } from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { EPublishStatus, ILab } from 'projects/shared-models/lab.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss'],
})
export class EditLabComponent implements OnInit, OnDestroy {
  EPublishStatus = EPublishStatus;
  autoSaving = false;
  autoSaveInterval;
  labId;
  lab: ILab;
  uploadedHeaderImage;
  uploadedHeaderImageFile: File;
  imagesList = [];
  tags: string[] = [];
  headerImageForm = this.fb.group({
    header_image: ['', Validators.required],
  });
  labForm: FormGroup;
  tinyMCE = {
    placeholder: 'Start typing here...*',
    min_height: 500,
    menubar: false,
    convert_urls: false,
    skin: 'outside',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 20px !important;}",
    plugins:
      'emoticons advlist lists autolink link charmap preview anchor image visualblocks code charmap codesample insertdatetime table code help wordcount autoresize media',

    toolbar:
      'formatselect | bold italic backcolor | codesample emoticons| \
      link | alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | image media | code | removeformat',
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'CSS', value: 'css' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'TypeScript', value: 'typescript' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
    ],
    default_link_target: '_blank',
    image_list: this.imagesList,
    image_advtab: true,
    branding: false,
    images_upload_handler: this.uploadTextImage.bind(this),
    toolbar_location: 'top',
    toolbar_sticky: true,
  };

  @ViewChild('submitDialog') submitDialog: TemplateRef<any>;
  submitDialogRef: NbDialogRef<any>;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private labsService: LabsService,
    private toastLogService: LibToastLogService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private seoService: SeoService,
    private dialogService: NbDialogService,
  ) {}

  get steps() {
    return this.labForm.get('lab_steps') as FormArray;
  }

  ngOnInit() {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lab_steps: this.fb.array([]),
      publish_status: [],
    });

    this.activatedRoute.params.subscribe((data) => {
      this.labId = data.lab_id;
      this.getLab();
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);

    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  initStep(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      publish_status: [],
    });
  }

  addStep() {
    (this.labForm.get('lab_steps') as FormArray).push(this.initStep());
  }

  removeStep(stepIndex: number) {
    (this.labForm.get('lab_steps') as FormArray).removeAt(stepIndex);
  }

  setMeta() {
    this.seoService.noIndex(true);

    this.seoService.setTags(
      `Edit ${this.lab.name} | By ${this.lab.user.name}`,
      this.lab.description.replace(/<[^>]*>/g, ''),
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  getLab() {
    this.labsService.getLab(this.labId).subscribe((data) => {
      this.lab = data;

      for (const img of this.lab.images) {
        this.imagesList.push({ title: img.url, value: img.url });
      }
      this.setMeta();
      this.tags = data.tags;
      this.prefillForm();
    });
  }

  prefillForm() {
    if (this.lab) {
      this.labForm.patchValue({
        name: this.lab.name,
        description: this.lab.description,
        publish_status: this.lab.publish_status,
      });

      if (this.lab.lab_steps) {
        (this.labForm as FormGroup).setControl('lab_steps', this.setLabFormSteps(this.lab.lab_steps));
      }
    }

    if (this.isBrowser) {
      this.autoSaveInterval = setInterval(() => {
        this.autoSaveLab();
      }, 10000);
    }
  }

  setLabFormSteps(labSteps: ILabStep[]): FormArray {
    const formArray = new FormArray([]);
    labSteps.forEach((lStep) => {
      const existingStepForm = this.fb.group({
        id: lStep.id,
        name: [lStep.name],
        description: [lStep.description],
      });
      formArray.push(existingStepForm);
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
    this.labsService.updateHeaderImage(this.lab.id, formData).subscribe((data) => {
      this.lab.header_image = data;
      this.toastLogService.successDialog('Updated!');
    });
  }

  deleteEventHeader() {
    this.labsService.deleteHeaderImage(this.lab.id).subscribe((data) => {
      this.uploadedHeaderImage = null;
      this.lab.header_image = null;
      this.toastLogService.successDialog('Deleted');
    });
  }

  // upload_inline_images
  uploadTextImage(blobInfo, progress) {
    const promise = new Promise<any>((resolve, reject) => {
      const formData: any = new FormData();
      formData.append('image', blobInfo.blob());
      this.labsService.uploadTextImage(this.lab.id, formData).subscribe({
        next: (res: any) => {
          this.imagesList.push({ value: res });
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        },
      });
    });
    return promise;
  }

  updateLab(publishStatus, forceSubmit: boolean = false) {
    if (this.lab.publish_status !== EPublishStatus.published) {
      this.labForm.patchValue({
        publish_status: publishStatus,
      });
    }
    if (this.steps.length < 3 && publishStatus === EPublishStatus.submitted && !forceSubmit) {
      this.submitDialogRef = this.dialogService.open(this.submitDialog);
    } else {
      this.labsService.updateLab(this.lab.slug, this.labForm.value, false).subscribe((data) => {
        if (data) {
          this.lab = data;
          this.submitTags();
          this.onSubmitDialogClose();
        }
      });
    }
  }

  // auto save every 10 seconds
  autoSaveLab() {
    this.autoSaving = true;
    this.labsService.updateLab(this.lab.slug, this.labForm.value, true).subscribe((data) => {
      if (data) {
        // this.lab = data;
        this.submitTags(false);
        this.autoSaving = false;
      }
    });
  }

  onTagAdd(value: string) {
    if (!this.tags.includes(value)) {
      this.tags.push(value);
    }
  }

  onTagDelete(value: string) {
    this.tags = this.tags.filter((tag) => tag !== value);
  }

  // tags
  submitTags(redirect = true) {
    this.labsService.updateTags(this.lab.id, this.tags).subscribe((data) => {
      if (redirect) {
        this.toastLogService.successDialog('Saved!');
        this.router.navigate(['/labs/my-labs']);
      }
    });
  }

  openGuide(element) {
    this.dialogService.open(element);
  }

  onSubmitDialogClose() {
    this.submitDialogRef.close();
  }
}
