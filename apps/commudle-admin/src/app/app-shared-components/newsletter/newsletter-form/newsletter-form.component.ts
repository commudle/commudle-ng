import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { Subscription, combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from '@commudle/shared-services';
import { faChevronLeft, faFileImage } from '@fortawesome/free-solid-svg-icons';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';
import { NbDialogService } from '@commudle/theme';

@Component({
  selector: 'commudle-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
})
export class NewsletterFormComponent implements OnInit, AfterViewInit {
  newsletterForm: FormGroup;
  parentId: string;
  parentType: string;
  pageSlug: string;
  subscriptions: Subscription[] = [];
  imagePreview;
  testEmailsForms: FormGroup;

  icons = {
    faChevronLeft,
    faFileImage,
  };
  editor: any = null;
  imageUrl = '';
  defaultTemplate = '';

  @ViewChild('gjs', { static: true }) gjsElement: ElementRef;
  @ViewChild('sendTestEmailDialog') sendTestEmailDialogBox: TemplateRef<any>;

  tinyMCE = {
    min_height: 500,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write content for custom page',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins: [
      'emoticons',
      'advlist',
      'lists',
      'autolink',
      'link',
      'charmap',
      'preview',
      'anchor',
      'image',
      'visualblocks',
      'code',
      'charmap',
      'codesample',
      'insertdatetime',
      'table',
      'code',
      'help',
      'wordcount',
      'autoresize',
      'media',
    ],
    toolbar:
      'bold italic backcolor forecolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
    license_key: 'gpl',
  };

  constructor(
    private newsletterService: NewsletterService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastrService: ToastrService,
    private dialogService: NbDialogService,
  ) {
    this.newsletterForm = this.fb.group({
      title: ['', Validators.required],
      email_subject: ['', Validators.required],
      published: [true],
      brief_description: ['', [Validators.required, Validators.maxLength(50)]],
      content: [''],
      banner_image: [null],
      grapes_js_editor: [true, Validators.required],
    });
    this.testEmailsForms = this.fb.group({
      emails: ['', [Validators.required, this.maxEmails(5)]],
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
          this.fetchNewsletterDetails();
        } else {
          this.newsletterForm.patchValue({
            grapes_js_editor: true,
          });
        }
      },
    );
  }

  ngAfterViewInit(): void {
    if (!this.pageSlug) {
      this.initEditor();
    }
  }

  maxEmails(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emails = control.value.split(',').map((email) => email.trim());
      return emails.length <= max ? null : { maxEmails: { max } };
    };
  }

  fetchNewsletterDetails() {
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
            grapes_js_editor: data.grapes_js_editor,
          });
          if (data.grapes_js_editor) {
            this.initEditor();
          }
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
        : this.getDefaultTemplate(),
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
      deviceManager: {
        devices: [
          {
            name: 'standard',
            width: '600px', // Width of the device
          },
          // Add other devices as needed
        ],
      },
    });
  }

  createOrUpdate(sendTestEmail: boolean = false) {
    if (this.newsletterForm.controls['grapes_js_editor'].value) {
      this.replaceImgSrc(this.editor.getHtml())
        .then((modifiedHtmlContent) => {
          const code = '<style>' + this.editor.getCss() + '</style>' + modifiedHtmlContent;
          this.newsletterForm.patchValue({ content: code });

          if (this.pageSlug) {
            this.update(sendTestEmail);
          } else {
            this.create(sendTestEmail);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      if (this.pageSlug) {
        this.update(sendTestEmail);
      } else {
        this.create(sendTestEmail);
      }
    }
  }

  replaceImgSrc(htmlContent: string): Promise<string> {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    const imgElements = tempElement.getElementsByTagName('img');

    const promises = [];

    for (let i = 0; i < imgElements.length; i++) {
      const img = imgElements[i];
      const originalSrc = img.getAttribute('src');
      if (originalSrc.startsWith('http')) {
        const promise = img.setAttribute('src', originalSrc);
        promises.push(promise);
      } else {
        const promise = this.generateNewImgSrc(originalSrc)
          .then((newSrc) => {
            img.setAttribute('src', newSrc);
          })
          .catch((error) => {
            console.error('Error generating new image source:', error);
          });
        promises.push(promise);
      }
    }

    return Promise.all(promises).then(() => {
      return tempElement.innerHTML;
    });
  }

  generateNewImgSrc(originalSrc): Promise<string> {
    return new Promise((resolve, reject) => {
      const binaryData = atob(originalSrc.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      const formData: any = new FormData();
      formData.append('image', new Blob([uint8Array], { type: 'image/png' }));

      this.newsletterService.attachImage(formData).subscribe(
        (data) => {
          this.imageUrl = data;
          resolve(this.imageUrl);
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

  create(sendTestEmail?) {
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
        if (sendTestEmail) {
          this.openTestEmailsDialogBox(data);
        }
      }
    });
  }

  update(sendTestEmail?) {
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
        if (sendTestEmail) {
          this.openTestEmailsDialogBox(data);
        }
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

  openTestEmailsDialogBox(newsletter) {
    this.dialogService.open(this.sendTestEmailDialogBox, { context: { newsletter } });
  }

  sendTestMail(newsletterId) {
    this.newsletterService
      .sendTestEmail(
        newsletterId,
        this.testEmailsForms.value.emails
          .replaceAll(' ', '')
          .split(',')
          .filter((x) => x),
      )
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Test Email send successfully');
          this.testEmailsForms.reset();
        }
      });
  }

  removeBannerImage() {
    this.imagePreview = '';
    this.newsletterForm.patchValue({
      banner_image: '',
    });
  }

  toggleEditorSwitch() {
    if (this.newsletterForm.controls['grapes_js_editor'].value) {
      setTimeout(() => {
        this.initEditor();
      }, 5000);
    }
  }

  getDefaultTemplate(): string {
    this.defaultTemplate = `<body style="box-sizing: border-box; margin: 0; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px;">
  <table id="i0066" style="box-sizing: border-box; height: 40px; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;" width="100%" height="40">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="imuyz" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top;" valign="top">
        </td>
      </tr>
    </tbody>
  </table>
  <div id="iempk" style="box-sizing: border-box; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">SUP {{name}}
  </div>
  <table id="i0js" width="100%" style="box-sizing: border-box; width: 100%; margin-top: 10px; margin-bottom: 10px;">
    <tbody id="iae1" style="box-sizing: border-box;">
      <tr id="idk4e" style="box-sizing: border-box;">
      </tr>
    </tbody>
  </table>
  <table id="ioe5l" class="list-item" style="box-sizing: border-box;">
    <tbody id="i87qi" style="box-sizing: border-box;">
      <tr id="igtl5" style="box-sizing: border-box;">
        <td id="iitl9" class="list-item-cell" style="box-sizing: border-box;">
          <table id="ig8fz" class="list-item-content" style="box-sizing: border-box;">
            <tbody id="if80q" style="box-sizing: border-box;">
              <tr id="izv7k" class="list-item-row" style="box-sizing: border-box;">
                <td id="ixr34" class="list-cell-left" style="box-sizing: border-box;">
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="ilmv8" style="box-sizing: border-box; height: 150px; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;" width="100%" height="150">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="io22z" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top; width: 30%;" width="30%" valign="top">
          <img id="iwv7m" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+" class="img" style="box-sizing: border-box; margin-top: 16px; margin-right: auto; margin-bottom: 0px; margin-left: auto; height: 121px; width: 129px; color: black;" width="129" height="121">
        </td>
        <td id="il5hh" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top; width: 70%;" width="70%" valign="top">
          <h1 class="heading" style="box-sizing: border-box;">Insert title here
          </h1>
          <p class="paragraph" style="box-sizing: border-box;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="ihbxq" style="box-sizing: border-box; height: 150px; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;" width="100%" height="150">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="ijm9c" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top; width: 30%;" width="30%" valign="top">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+" id="ircoj" class="img" style="box-sizing: border-box; margin-top: 16px; margin-right: auto; margin-bottom: 0px; margin-left: auto; height: 121px; width: 129px; color: black;" width="129" height="121">
        </td>
        <td id="igggg" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top; width: 70%;" width="70%" valign="top">
          <h1 class="heading" style="box-sizing: border-box;">Insert title here
          </h1>
          <p class="paragraph" style="box-sizing: border-box;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="ileda" style="box-sizing: border-box; height: 150px; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;" width="100%" height="150">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="ij8e7" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top;" valign="top">
          <h1 class="heading" style="box-sizing: border-box;">Insert title here
          </h1>
          <p class="paragraph" style="box-sizing: border-box;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="i3uq9" class="list-item" style="box-sizing: border-box;">
    <tbody id="ifj08" style="box-sizing: border-box;">
      <tr id="i1jc5" style="box-sizing: border-box;">
        <td id="i0qc8" class="list-item-cell" style="box-sizing: border-box;">
          <table id="ixkbd" class="list-item-content" style="box-sizing: border-box;">
            <tbody id="itpeu" style="box-sizing: border-box;">
              <tr id="i432b" class="list-item-row" style="box-sizing: border-box;">
                <td id="i4hal" class="list-cell-left" style="box-sizing: border-box;">
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="ics9s" style="box-sizing: border-box; width: 100%; margin-top: 10px; margin-bottom: 10px;" width="100%">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td class="divider" style="box-sizing: border-box; background-color: rgba(0, 0, 0, 0.1); height: 1px;" height="1" bgcolor="rgba(0, 0, 0, 0.1)">
        </td>
      </tr>
    </tbody>
  </table>
  <table id="ilp29" class="grid-item-row" style="box-sizing: border-box;">
    <tbody id="ixumo" style="box-sizing: border-box;">
      <tr id="is27z" style="box-sizing: border-box;">
        <td id="iq3m9" class="grid-item-cell2-l" style="box-sizing: border-box;">
          <table id="i2pjc" class="grid-item-card" style="box-sizing: border-box;">
            <tbody id="io11a" style="box-sizing: border-box;">
              <tr id="ij15h" style="box-sizing: border-box;">
                <td id="imq2i" class="grid-item-card-cell" style="box-sizing: border-box;">
                  <img id="ijvdw" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+" class="image" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; width: 186px; height: 129px; color: black;" width="186" height="129">
                  <table id="iw1lb" class="grid-item-card-body" style="box-sizing: border-box;">
                    <tbody id="i1p21" style="box-sizing: border-box;">
                      <tr id="izbh4" style="box-sizing: border-box;">
                        <td id="irrb1" class="grid-item-card-content" style="box-sizing: border-box;">
                          <h1 id="izf9k" class="card-title" style="box-sizing: border-box;">Title here
                          </h1>
                          <p id="icjwm" class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
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
        <td id="ihm66" class="grid-item-cell2-r" style="box-sizing: border-box;">
          <img id="irwdk" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+" class="image" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; width: 186px; height: 129px; color: black;" width="186" height="129">
          <table id="iexc5" class="grid-item-card" style="box-sizing: border-box;">
            <tbody id="ixpu8" style="box-sizing: border-box;">
              <tr id="izn8k" style="box-sizing: border-box;">
                <td id="ii4la" class="grid-item-card-cell" style="box-sizing: border-box;">
                  <table id="i91kx" class="grid-item-card-body" style="box-sizing: border-box;">
                    <tbody id="i6nwk" style="box-sizing: border-box;">
                      <tr id="iae3g" style="box-sizing: border-box;">
                        <td id="insbg" class="grid-item-card-content" style="box-sizing: border-box;">
                          <h1 id="iqdnk" class="card-title" style="box-sizing: border-box;">Title here
                          </h1>
                          <p id="id0a7" class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
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
  <table id="ij0tm" style="box-sizing: border-box; height: 40px; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;" width="100%" height="40">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td id="ismog" style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; vertical-align: top;" valign="top">
        </td>
      </tr>
    </tbody>
  </table>
</body>`;
    return this.defaultTemplate;
  }
}
