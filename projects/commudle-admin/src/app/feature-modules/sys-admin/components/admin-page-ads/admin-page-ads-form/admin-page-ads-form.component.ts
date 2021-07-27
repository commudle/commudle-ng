import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SysAdminPageAdsService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-page-ads.service';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { IPageAd } from 'projects/shared-models/page-ad.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-page-ads-form',
  templateUrl: './admin-page-ads-form.component.html',
  styleUrls: ['./admin-page-ads-form.component.scss'],
})
export class AdminPageAdsFormComponent implements OnInit, OnDestroy {
  pageAd: IPageAd;
  linkRegex =
    /^(?:https?|ftp|file):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  iframeRegex = /^<iframe[^>]*(?:\/>|>.*?<\/iframe>)/g;
  pageAdForm: FormGroup = this.fb.group(
    {
      title: ['', Validators.required],
      content: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.linkRegex)]],
      external_link: [true, Validators.required],
      is_default: [false, Validators.required],
      slot: ['', Validators.required],
      iframe: ['', Validators.pattern(this.iframeRegex)],
      start_at: [''],
      end_at: [''],
    },
    { validators: this.checkDates },
  );
  uploadedFiles: IAttachedFile[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private libToastLogService: LibToastLogService,
    private sysAdminPageAdsService: SysAdminPageAdsService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.getPageAd(+params.pageAdId || 0);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  checkDates(group: FormGroup): null | { notValid: true } {
    if (group.controls.start_at.value > group.controls.end_at.value) {
      return { notValid: true };
    }
    return null;
  }

  getPageAd(pageAdId: number): void {
    if (pageAdId > 0) {
      this.subscriptions.push(
        this.sysAdminPageAdsService.getAdById(pageAdId).subscribe((value) => {
          this.pageAd = value;
          this.prefillPageAd();
        }),
      );
    }
  }

  prefillPageAd(): void {
    this.pageAdForm.patchValue({
      title: this.pageAd.title,
      content: this.pageAd.content,
      link: this.pageAd.link,
      external_link: this.pageAd.external_link,
      is_default: this.pageAd.is_default,
      slot: this.pageAd.slot,
      iframe: this.pageAd.iframe,
    });

    // Patch dates
    if (this.pageAd.start_at) {
      this.pageAdForm.patchValue({
        start_at: new Date(this.pageAd.start_at).toISOString().slice(0, -1),
      });
    }
    if (this.pageAd.end_at) {
      this.pageAdForm.patchValue({
        end_at: new Date(this.pageAd.end_at).toISOString().slice(0, -1),
      });
    }

    // Patch files
    for (const file of this.pageAd.files) {
      this.uploadedFiles.push({
        id: file.id,
        file: null,
        url: file.url,
        name: file.filename,
        type: null,
      });
    }
  }

  addFiles(event: Event): void {
    let fileList: FileList = (event.target as HTMLInputElement).files;
    const inputFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      inputFiles.push(fileList.item(i));
    }
    // Check if total file size is less than 2MB
    if (inputFiles?.map((file) => file.size).reduce((a: number, b: number) => a + b, 0) > 2425190) {
      this.libToastLogService.warningDialog('Files should be less than 2MB', 3000);
    } else {
      if (inputFiles?.length > 0) {
        for (const file of inputFiles) {
          const iAttachedFile: IAttachedFile = {
            id: null,
            file,
            url: null,
            name: null,
            type: null,
          };
          this.uploadedFiles.push(iAttachedFile);
        }
      }
    }
  }

  deleteFile(index: number): void {
    if (this.uploadedFiles[index].id) {
      this.uploadedFiles[index]['delete'] = true;
    } else {
      this.uploadedFiles.splice(index, 1);
    }
  }

  submitForm(): void {
    if (!this.pageAd) {
      this.createPageAd();
    } else {
      this.updatePageAd();
    }
  }

  createPageAd(): void {
    this.subscriptions.push(
      this.sysAdminPageAdsService.createAd(this.buildFormData()).subscribe(() => {
        this.router.navigate(['/sys-admin', 'pa']).then(
          () => {
            this.libToastLogService.successDialog('Created ad successfully!');
          },
          () => {},
        );
      }),
    );
  }

  updatePageAd(): void {
    this.subscriptions.push(
      this.sysAdminPageAdsService.updateAd(this.buildFormData(), this.pageAd.id).subscribe(() => {
        this.router.navigate(['/sys-admin', 'pa']).then(
          () => {
            this.libToastLogService.successDialog('Updated ad successfully!');
          },
          () => {},
        );
      }),
    );
  }

  buildFormData(): FormData {
    const formData: FormData = new FormData();
    const pageAdFormValue = this.pageAdForm.value;

    Object.keys(pageAdFormValue).forEach((value) => {
      if (pageAdFormValue[value] != null) {
        formData.append(`page_ad[${value}]`, pageAdFormValue[value]);
      }
    });

    this.uploadedFiles.forEach((item) => {
      Object.keys(item).forEach((value) => {
        formData.append(`page_ad[attachments][][${value}]`, item[value]);
      });
    });

    return formData;
  }
}
