import { Subscription, debounceTime } from 'rxjs';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '@commudle/shared-services';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { Location } from '@angular/common';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-page-form',
  templateUrl: './custom-page-form.component.html',
  styleUrls: ['./custom-page-form.component.scss'],
})
export class CustomPageFormComponent implements OnInit, OnDestroy {
  customPageForm: FormGroup;
  parentId: string;
  parentType: string;
  pageSlug: string;
  icons = {
    faChevronLeft,
  };

  subscriptions: Subscription[] = [];
  @ViewChild('cancelDialogBox') cancelDialogBox: TemplateRef<any>;

  tinyMCE = {
    min_height: 500,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write content for custom page',
    plugins:
      'emoticons advlist lists autolink link charmap preview anchor image visualblocks code charmap codesample insertdatetime table code help wordcount autoresize media',
    toolbar:
      'h1  h2  h3  h4  h5  h6 fontsize | bold italic backcolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
    font_size_formats: '12pt 14pt 16pt 18pt 24pt',
  };

  constructor(
    private fb: FormBuilder,
    private customPageService: CustomPageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private dialogService: NbDialogService,
    private location: Location,
  ) {
    this.customPageForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      published: [true],
      content: ['', Validators.required],
      slug: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.generateSlug();
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.pageSlug = params['page_slug'];
        if (this.pageSlug) {
          this.fetchCustomPageDetails();
        }
      }),

      this.activatedRoute.parent.parent.paramMap.subscribe((params) => {
        if (params.get('community_id')) {
          this.parentId = params.get('community_id');
          this.parentType = 'Kommunity';
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  generateSlug() {
    this.customPageForm.controls['title'].valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.customPageService
        .getSlug(this.parentId, this.parentType, this.customPageForm.controls['title'].value)
        .subscribe((data) => {
          this.customPageForm.controls['slug'].setValue(data);
        });
    });
  }

  fetchCustomPageDetails() {
    this.subscriptions.push(
      this.customPageService.getShow(this.pageSlug).subscribe((data: ICustomPage) => {
        if (data) {
          this.customPageForm.patchValue({
            title: data.title,
            description: data.description,
            published: data.published,
            content: data.content,
          });
        }
      }),
    );
  }

  createOrUpdate() {
    if (this.pageSlug) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.customPageService
      .createNewCustomPage(this.customPageForm.value, this.parentId, this.parentType)
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Page Created');
          this.backPage();
        }
      });
  }

  update() {
    this.customPageService.update(this.customPageForm.value, this.pageSlug).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Page Updated');
        this.backPage();
      }
    });
  }

  backPage() {
    this.location.back();
  }

  backButtonClick() {
    if (this.customPageForm.dirty) {
      this.openCancelDialogBox();
    } else {
      this.backPage();
    }
  }

  openCancelDialogBox() {
    this.dialogService.open(this.cancelDialogBox);
  }
}
