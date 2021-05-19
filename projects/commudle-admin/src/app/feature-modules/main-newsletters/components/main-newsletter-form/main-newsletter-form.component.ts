import { FormBuilder, Validators } from '@angular/forms';
import { MainNewslettersService } from './../../services/main-newsletters.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-newsletter-form',
  templateUrl: './main-newsletter-form.component.html',
  styleUrls: ['./main-newsletter-form.component.scss']
})
export class MainNewsletterFormComponent implements OnInit, OnDestroy {

  newsLetter: IMainNewsletter;
  isLoading = false;

  imagesList = [];
  tinyMCE = {
    placeholder: 'Start typing here...*',
    min_height: 500,
    width: '700',
    menubar: false,
    convert_urls: false,
    skin: 'outside',
    content_style: '@import url(\'https://fonts.googleapis.com/css?family=Work Sans\'); body {font-family: \'Work Sans\';}',
    fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 28pt 36pt",
    plugins: [
      'emoticons advlist lists autolink link charmap preview anchor',
      'visualblocks code charmap image codesample',
      'insertdatetime table paste code help wordcount autoresize media table',
    ],
    toolbar:
      'formatselect | fontsizeselect | bold italic forecolor backcolor | codesample emoticons| \
      link | alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | image media | code | removeformat',
    table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
    codesample_languages: [
      {text: 'HTML/XML', value: 'markup'},
      {text: 'CSS', value: 'css'},
      {text: 'JavaScript', value: 'javascript'},
      {text: 'TypeScript', value: 'typescript'},
      {text: 'PHP', value: 'php'},
      {text: 'Ruby', value: 'ruby'},
      {text: 'Python', value: 'python'},
      {text: 'Java', value: 'java'},
      {text: 'C', value: 'c'},
      {text: 'C#', value: 'csharp'},
      {text: 'C++', value: 'cpp'}
    ],
    default_link_target: '_blank',
    image_list: this.imagesList,
    image_advtab: true,
    branding: false,
    images_upload_handler: this.uploadTextImage.bind(this),
    toolbar_location: 'top',
    toolbar_sticky: true
  }




  form = this.fb.group({
    title: ['', Validators.required],
    email_subject: ['', Validators.required],
    content: ['', Validators.required]
  })


  constructor(
    private title: Title,
    private meta: Meta,
    private mainNewsLettersService: MainNewslettersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      data => {
        if (data.main_newsletter_id) {
          this.mainNewsLettersService.show(data.main_newsletter_id).subscribe(
            data => {
              this.newsLetter = data;
              this.form.patchValue({
                title: this.newsLetter.title,
                email_subject: this.newsLetter.email_subject,
                content: this.newsLetter.content
              })
            }
          )

        }
      }
    )
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.meta.removeTag("name='robots'");
  }


  // create or update basis existence of newsletter
  submitForm() {
    let formData = this.form.value;
    this.isLoading = true;
    if (this.newsLetter) {
      this.mainNewsLettersService.update(formData, this.newsLetter.id).subscribe(
        data => {
          this.isLoading = false;
          this.toastLogService.successDialog('Saved', 2000);
        }
      )
    } else {
      this.mainNewsLettersService.create(formData).subscribe(
        data => {
          this.isLoading = false;
          console.log(data);
          this.toastLogService.successDialog('Saved', 2000);
        }
      )
    }
  }


  // upload_inline_images
  uploadTextImage(blobInfo, success, failure) {
    const formData: any = new FormData();
    formData.append('image', blobInfo.blob());
    this.mainNewsLettersService.attachImage(this.newsLetter.id, formData).subscribe(data => {
      if (data) {
        this.imagesList.push({title: data, value: data});
        success(data);
      }
    });
  }

  setMeta() {
    this.title.setTitle(`Create Newsletter`);
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

}
