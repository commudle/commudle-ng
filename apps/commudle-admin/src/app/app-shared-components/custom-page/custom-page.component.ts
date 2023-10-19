import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss'],
})
export class CustomPageComponent implements OnInit {
  @Input() parentId: number;
  @Input() parentType: 'CommunityGroup' | 'Kommunity';
  subscription: Subscription[] = [];
  pages: ICustomPage[];

  customPageForm: FormGroup;
  dialogBox: NbDialogRef<any[]>;

  tinyMCE = {
    height: 300,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write content for custom page',
    plugins:
      'advlist lists autolink link charmap preview anchor visualblocks code table charmap insertdatetime table code help wordcount autoresize',
    toolbar:
      'fontsize | bold italic backcolor | codesample emoticons| \
      link | alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | image media | code | removeformat',
    default_link_target: '_blank',
    branding: false,
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt',
  };
  constructor(
    private dialogService: NbDialogService,
    private customPageService: CustomPageService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
  ) {
    this.customPageForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      published: [true],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCustomPages();
  }

  getCustomPages() {
    this.subscription.push(
      this.customPageService.getIndex(this.parentId, this.parentType).subscribe((data) => {
        this.pages = data;
      }),
    );
  }

  openCreateNewPageDialog(dialog: TemplateRef<any>, page?: ICustomPage, index?) {
    this.customPageForm.reset();
    if (page) {
      this.customPageForm.patchValue({
        title: page.title,
        description: page.description,
        published: page.published,
        content: page.content,
      });
    }
    this.dialogBox = this.dialogService.open(dialog, { context: { page: page, index: index } });
  }

  create() {
    this.customPageService
      .createNewCustomPage(this.customPageForm.value, this.parentId, this.parentType)
      .subscribe((data) => {
        this.pages.unshift(data);
        this.closeDialogBox();
      });
  }

  update(pageId: number, index: number) {
    this.customPageService.update(this.customPageForm.value, pageId).subscribe((data) => {
      if (data) {
        this.pages[index] = data;
        this.closeDialogBox();
      }
    });
  }

  togglePublished(id, index) {
    this.customPageService.togglePublished(!this.pages[index].published, id).subscribe((data) => {
      this.pages[index] = data;
    });
  }

  destroy(id, index) {
    this.customPageService.destroy(id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Deleted Successfully');
        this.pages.splice(index, 1);
      }
    });
  }

  closeDialogBox() {
    this.dialogBox.close();
  }
}
