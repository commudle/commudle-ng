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
  imageUrl = '';

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
      brief_description: ['', [Validators.required, Validators.maxLength(50)]],
      content: [''],
      banner_image: [null],
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
            brief_description: data.brief_description,
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
        : `<body id="iewh" style="box-sizing: border-box; margin: 4px;">
  <table id="ilu7" style="box-sizing: border-box; height: 150px; margin: 0 auto 10px auto; padding: 5px 5px 5px 5px; width: 100%;" width="100%" height="150">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="ifa6" style="box-sizing: border-box; padding: 0; margin: 0; vertical-align: top;" valign="top">
          <img id="i5zz" src="https://json.commudle.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3UzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c793a76a579714d72bf7e51b0fe9d4d13640a460/commudle-logo-full.png" style="box-sizing: border-box; color: black; width: 100%;">
        </td>
      </tr>
    </tbody>
  </table>
  <div id="iempk" style="box-sizing: border-box; padding: 10px;">SUP {{name}}
  </div>
  <table id="i0js" style="box-sizing: border-box; width: 100%; margin-top: 10px; margin-bottom: 10px;" width="100%">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
      </tr>
    </tbody>
  </table>
  <table class="list-item" style="box-sizing: border-box;">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td class="list-item-cell" style="box-sizing: border-box;">
          <table class="list-item-content" style="box-sizing: border-box;">
            <tbody style="box-sizing: border-box;">
              <tr class="list-item-row" style="box-sizing: border-box;">
                <td class="list-cell-left" style="box-sizing: border-box;">
                  <img src="https://via.placeholder.com/150/78c5d6/fff" alt="Image" class="list-item-image" style="box-sizing: border-box;">
                </td>
                <td class="list-cell-right" style="box-sizing: border-box;">
                  <h1 class="card-title" style="box-sizing: border-box;">Title here
                  </h1>
                  <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table class="list-item" style="box-sizing: border-box;">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td class="list-item-cell" style="box-sizing: border-box;">
          <table class="list-item-content" style="box-sizing: border-box;">
            <tbody style="box-sizing: border-box;">
              <tr class="list-item-row" style="box-sizing: border-box;">
                <td class="list-cell-left" style="box-sizing: border-box;">
                  <img src="https://via.placeholder.com/150/78c5d6/fff" alt="Image" class="list-item-image" style="box-sizing: border-box;">
                </td>
                <td class="list-cell-right" style="box-sizing: border-box;">
                  <h1 class="card-title" style="box-sizing: border-box;">Title here
                  </h1>
                  <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="igo5e" style="box-sizing: border-box; height: 150px; margin: 0 auto 10px auto; padding: 5px 5px 5px 5px; width: 100%;" width="100%" height="150">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="isp6a" style="box-sizing: border-box; padding: 0; margin: 0; vertical-align: top;" valign="top">
          <h1 class="heading" style="box-sizing: border-box;">Insert title here
          </h1>
          <p class="paragraph" style="box-sizing: border-box;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <table class="grid-item-row" style="box-sizing: border-box;">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td class="grid-item-cell2-l" style="box-sizing: border-box;">
          <table class="grid-item-card" style="box-sizing: border-box;">
            <tbody style="box-sizing: border-box;">
              <tr style="box-sizing: border-box;">
                <td class="grid-item-card-cell" style="box-sizing: border-box;">
                  <img src="https://via.placeholder.com/250x150/78c5d6/fff/" alt="Image" class="grid-item-image" style="box-sizing: border-box;">
                  <table class="grid-item-card-body" style="box-sizing: border-box;">
                    <tbody style="box-sizing: border-box;">
                      <tr style="box-sizing: border-box;">
                        <td class="grid-item-card-content" style="box-sizing: border-box;">
                          <h1 class="card-title" style="box-sizing: border-box;">Title here
                          </h1>
                          <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td class="grid-item-cell2-r" style="box-sizing: border-box;">
          <table class="grid-item-card" style="box-sizing: border-box;">
            <tbody style="box-sizing: border-box;">
              <tr style="box-sizing: border-box;">
                <td class="grid-item-card-cell" style="box-sizing: border-box;">
                  <img src="https://via.placeholder.com/250x150/78c5d6/fff/" alt="Image" class="grid-item-image" style="box-sizing: border-box;">
                  <table class="grid-item-card-body" style="box-sizing: border-box;">
                    <tbody style="box-sizing: border-box;">
                      <tr style="box-sizing: border-box;">
                        <td class="grid-item-card-content" style="box-sizing: border-box;">
                          <h1 class="card-title" style="box-sizing: border-box;">Title here
                          </h1>
                          <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="ihwk" style="box-sizing: border-box; height: 150px; margin: 0 auto 10px auto; padding: 5px 5px 5px 5px; width: 100%;" width="100%" height="150">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
      </tr>
    </tbody>
  </table>
</body>`,
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
    this.newsletterForm.patchValue({ content: this.replaceImgSrc(this.editor.getHtml()) });
    if (this.pageSlug) {
      this.update();
    } else {
      this.create();
    }
  }

  replaceImgSrc(htmlContent: string): string {
    // Create a DOM element to parse the HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    // Find all img tags in the parsed HTML
    const imgElements = tempElement.getElementsByTagName('img');

    // Loop through each img tag and replace the src attribute
    for (let i = 0; i < imgElements.length; i++) {
      const img = imgElements[i];
      const originalSrc = img.getAttribute('src');

      // Use your custom function to generate a new link based on the original src
      const newSrc = this.generateNewImgSrc(originalSrc);

      // Set the new src attribute
      img.setAttribute('src', newSrc);
    }

    // Return the modified HTML content
    return tempElement.innerHTML;
  }

  generateNewImgSrc(originalSrc): string {
    // this.imageUrl = '';
    const binaryData = atob(originalSrc.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    const formData: any = new FormData();
    formData.append('image', new Blob([uint8Array], { type: 'image/png' }));

    this.newsletterService.attachImage(10, formData).subscribe((data) => {
      this.imageUrl = data;
    });
    return this.imageUrl;
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
      } else if (key !== 'banner_image') {
        formData.append('newsletter[' + key + ']', value);
      }
    });
    this.newsletterService.createNewNewsletter(formData, this.parentId, this.parentType).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Newsletter Created');
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
        this.toastrService.successDialog('Newsletter Updated');
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
