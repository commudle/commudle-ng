import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { Subscription, combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from '@commudle/shared-services';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';

@Component({
  selector: 'commudle-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
})
export class NewsletterFormComponent implements OnInit {
  newsletterForm: FormGroup;
  parentId: string;
  parentType: string;
  pageSlug: string;
  subscriptions: Subscription[] = [];
  imagePreview;

  icons = {
    faChevronLeft,
  };
  editor: any = null;

  @ViewChild('gjs', { static: true }) gjsElement: ElementRef;

  constructor(
    private newsletterService: NewsletterService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastrService: ToastrService,
  ) {
    this.newsletterForm = this.fb.group({
      title: ['', Validators.required],
      email_subject: ['', Validators.required],
      published: [true],
      content: [''],
      banner_image: [File],
    });
  }

  ngOnInit() {
    combineLatest([this.activatedRoute.parent.parent.paramMap, this.activatedRoute.params]).subscribe(
      ([params, data]) => {
        this.pageSlug = data.newsletter_slug;
        if (params.get('community_id')) {
          this.parentId = params.get('community_id');
          this.parentType = 'Kommunity';
        }
        if (params.get('community_group_id')) {
          this.parentId = params.get('community_group_id');
          this.parentType = 'CommunityGroup';
        }

        if (this.pageSlug) {
          this.fetchCustomPageDetails();
        } else {
          this.initEditor();
        }
      },
    );
  }

  fetchCustomPageDetails() {
    this.subscriptions.push(
      this.newsletterService.getShow(this.pageSlug).subscribe((data: INewsletter) => {
        if (data) {
          this.newsletterForm.patchValue({
            title: data.title,
            email_subject: data.email_subject,
            published: data.published,
            content: data.content,
            banner_image: data.banner_image?.url,
          });
          this.initEditor();
        }
      }),
    );
  }

  initEditor() {
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      components: this.newsletterForm.get('content').value
        ? this.newsletterForm.get('content').value
        : '<h1>Content for newsletter, You can drag drop from right pannel</h1>',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: false,
      // Size of the editor
      height: '700px',
      width: 'auto',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: { defaults: [] },
      plugins: [plugin],
      pluginsOpts: {
        plugin: {},
      },
    });
  }

  createOrUpdate() {
    this.newsletterForm.patchValue({ content: this.editor.getHtml() });
    if (this.pageSlug) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    // Create a FormData object
    const formData = new FormData();

    // Append form values to the FormData object
    Object.keys(this.newsletterForm.value).forEach((key) => {
      const value = this.newsletterForm.value[key];

      // Check if the value is a File (FileList) for file inputs
      if (value instanceof File) {
        formData.append('newsletter[' + key + ']', value, value.name); // Append the file with its name
      } else {
        formData.append('newsletter[' + key + ']', value);
      }
    });
    this.newsletterService.createNewNewsletter(formData, this.parentId, this.parentType).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Page Created');
        this.backPage();
      }
    });
  }

  update() {
    // Create a FormData object
    const formData = new FormData();

    // Append form values to the FormData object
    Object.keys(this.newsletterForm.value).forEach((key) => {
      const value = this.newsletterForm.value[key];

      // Check if the value is a File (FileList) for file inputs
      if (value instanceof File) {
        formData.append('newsletter[' + key + ']', value, value.name); // Append the file with its name
      } else if (key !== 'banner_image') {
        formData.append('newsletter[' + key + ']', value);
      }
    });
    this.newsletterService.update(formData, this.pageSlug).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Page Updated');
        this.backPage();
      }
    });
  }

  backPage() {
    this.location.back();
  }

  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newsletterForm.patchValue({
      banner_image: file,
    });
    this.newsletterForm.get('banner_image').updateValueAndValidity();

    // Display image preview
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
