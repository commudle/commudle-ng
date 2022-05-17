import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNewslettersService } from 'projects/commudle-admin/src/app/feature-modules/main-newsletters/services/main-newsletters.service';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { CanComponentDeactivate } from 'projects/shared-services/check-redirect.guard';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-newsletter-form',
  templateUrl: './main-newsletter-form.component.html',
  styleUrls: ['./main-newsletter-form.component.scss'],
})
export class MainNewsletterFormComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  newsLetter: IMainNewsletter;
  isLoading = false;
  unsavedChanges = true;
  previewContent;

  imagesList = [];
  subscriptions = [];
  currentRoute;
  form = this.fb.group({
    title: ['', Validators.required],
    email_subject: ['', Validators.required],
    sender: [''],
    content: ['', Validators.required],
  });
  tinyMCE = {
    placeholder: 'Start typing here...*',
    min_height: 500,
    width: '650',
    menubar: false,
    convert_urls: false,
    skin: 'outside',
    content_style: "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter';}",
    fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 28pt 36pt',
    plugins: [
      'emoticons advlist lists autolink link charmap preview anchor',
      'visualblocks code charmap image codesample',
      'insertdatetime table paste code help wordcount autoresize table',
    ],
    toolbar:
      'formatselect | fontsizeselect | bold italic forecolor backcolor | image emoticons | \
      link | alignleft aligncenter alignright alignjustify | table | \
      bullist numlist outdent indent | codesample | code | removeformat',
    table_toolbar:
      'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
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
    style_formats: [
      {
        title: 'Image Left',
        selector: 'img',
        styles: {
          float: 'left',
          margin: '0 10px 0 10px',
        },
      },
      {
        title: 'Image Right',
        selector: 'img',
        styles: {
          float: 'right',
          margin: '0 10px 0 10px',
        },
      },
    ],
    default_link_target: '_blank',
    image_list: this.imagesList,
    image_advtab: true,
    branding: false,
    image_caption: true,
    images_upload_handler: this.uploadTextImage.bind(this),
    toolbar_location: 'top',
    toolbar_sticky: true,
    setup: (editor) => {
      editor.on('init', (e) => {
        this.form.markAsPristine();
      });
    },
  };

  constructor(
    private seoService: SeoService,
    private mainNewsLettersService: MainNewslettersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private santizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.setMeta();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        if (data.main_newsletter_id) {
          this.mainNewsLettersService.show(data.main_newsletter_id).subscribe((data) => {
            this.newsLetter = data;
            this.form.patchValue({
              title: this.newsLetter.title,
              email_subject: this.newsLetter.email_subject,
              sender: this.newsLetter.sender,
              content: this.newsLetter.content,
            });
            this.form.markAsPristine();
          });
        }
      }),
      this.form.valueChanges.subscribe((data) => {
        this.unsavedChanges = true;
      }),
      this.form.get('content').valueChanges.subscribe((data) => {
        this.previewContent = this.santizer.bypassSecurityTrustHtml(data);
      }),
    );
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);

    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.form.pristine && this.unsavedChanges) {
      return window.confirm('There might be some unsaved changes. Are you sure you want to leave?');
    } else {
      return true;
    }
  }

  markFormPristine() {
    this.form.markAsPristine();
    this.unsavedChanges = false;
  }

  // create or update basis existence of newsletter
  submitForm() {
    let formData = this.form.value;
    this.isLoading = true;
    if (this.newsLetter) {
      this.mainNewsLettersService.update(formData, this.newsLetter.id).subscribe((data) => {
        this.isLoading = false;
        this.toastLogService.successDialog('Saved', 2000);
        this.markFormPristine();
      });
    } else {
      this.mainNewsLettersService.create(formData).subscribe((data) => {
        this.newsLetter = data;
        this.isLoading = false;
        this.toastLogService.successDialog('Saved', 2000);
        this.markFormPristine();
      });
    }
  }

  // upload_inline_images
  uploadTextImage(blobInfo, success, failure) {
    const formData: any = new FormData();
    formData.append('image', blobInfo.blob());
    this.mainNewsLettersService.attachImage(this.newsLetter.id, formData).subscribe((data) => {
      if (data) {
        this.imagesList.push({ title: data, value: data });
        success(data);
      }
    });
  }

  setMeta() {
    this.seoService.setTitle(`Create Newsletter`);
    this.seoService.noIndex(true);
  }
}
