import { Subscription, debounceTime, combineLatest } from 'rxjs';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '@commudle/shared-services';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { Location } from '@angular/common';
import { ICustomPage, EPageType } from 'apps/shared-models/custom-page.model';
import { NbDialogService } from '@commudle/theme';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { EDbModels } from '@commudle/shared-models';

@Component({
  selector: 'app-custom-page-form',
  templateUrl: './custom-page-form.component.html',
  styleUrls: ['./custom-page-form.component.scss'],
})
export class CustomPageFormComponent implements OnInit, OnDestroy {
  customPageForm: FormGroup;
  @Input() parentId: string;
  @Input() parentType: EDbModels;
  @Input() pageType: EPageType;
  pageSlug: string;
  icons = {
    faChevronLeft,
  };
  EPageType = EPageType;

  subscriptions: Subscription[] = [];
  @ViewChild('cancelDialogBox') cancelDialogBox: TemplateRef<any>;
  tinyMCE = {
    min_height: 500,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write content for custom page',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins:
      'emoticons advlist lists autolink link charmap preview anchor image visualblocks code charmap codesample insertdatetime table code help wordcount autoresize media',
    toolbar:
      'bold italic backcolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
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
      page_type: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.generateSlug();
    if (this.pageType) {
      this.customPageForm.patchValue({
        page_type: this.pageType,
      });
    }
    combineLatest([this.activatedRoute.parent.parent.paramMap, this.activatedRoute.params]).subscribe(
      ([params, data]) => {
        this.pageSlug = data.page_slug;
        if (params.get('community_id')) {
          this.parentId = params.get('community_id');
          this.parentType = EDbModels.KOMMUNITY;
        }
        if (params.get('community_group_id')) {
          this.parentId = params.get('community_group_id');
          this.parentType = EDbModels.COMMUNITY_GROUP;
        }

        if (this.pageSlug) {
          this.fetchCustomPageDetails();
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  generateSlug() {
    this.customPageForm.controls['title'].valueChanges.pipe(debounceTime(800)).subscribe(() => {
      if (!this.pageSlug) {
        this.customPageService
          .getSlug(this.parentId, this.parentType, this.customPageForm.controls['title'].value)
          .subscribe((data) => {
            this.customPageForm.controls['slug'].setValue(data);
          });
      }
    });
  }

  fetchCustomPageDetails() {
    this.subscriptions.push(
      this.customPageService.getShow(this.pageSlug, this.parentId, this.parentType).subscribe((data: ICustomPage) => {
        if (data) {
          this.customPageForm.patchValue({
            title: data.title,
            description: data.description,
            published: data.published,
            content: data.content,
            slug: data.slug,
            page_type: data.page_type,
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
          if (!this.pageType) this.backPage();
        }
      });
  }

  update() {
    this.customPageService.update(this.customPageForm.value, this.pageSlug).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Page Updated');
        if (!this.pageType) this.backPage();
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
