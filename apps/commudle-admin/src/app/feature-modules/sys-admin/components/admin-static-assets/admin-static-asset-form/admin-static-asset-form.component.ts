import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStaticAssetsService } from '../../../services/admin-static-assets.service';
import { IAttachedFile } from '@commudle/shared-models';
import { IStaticAsset } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-admin-static-asset-form',
  templateUrl: './admin-static-asset-form.component.html',
  styleUrls: ['./admin-static-asset-form.component.scss'],
})
export class AdminStaticAssetFormComponent implements OnInit {
  asset: IStaticAsset;
  assetForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    asset: ['', Validators.required],
  });
  uploadedFile: IAttachedFile;
  fileUploaded = false;
  subscriptions: Subscription[] = [];
  fileSrc: string;

  @ViewChild('inputfile') inputfile: ElementRef;

  constructor(
    private adminStaticAssetsService: AdminStaticAssetsService,
    private fb: FormBuilder,
    private router: Router,
    private libToastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.getAsset(+params.assetId || 0);
      }),
    );
  }

  getAsset(assetId: number): void {
    if (assetId >= 0) {
      this.subscriptions.push(
        this.adminStaticAssetsService.getAssetById(assetId).subscribe((value) => {
          this.asset = value;
          this.prefillAsset();
        }),
      );
    }
  }

  prefillAsset(): void {
    this.assetForm.patchValue({
      name: this.asset.name,
    });

    if (this.asset.file) {
      this.uploadedFile = this.asset.file;
      this.fileSrc = this.asset.file.url;
      this.fileUploaded = true;
    }
  }

  addFile(event: Event): void {
    const fileList: FileList = (event.target as HTMLInputElement).files;
    const inputfile: File = fileList.length ? fileList[0] : null;

    if (inputfile?.size > 2425190) {
      this.libToastLogService.warningDialog('Files should be less than 2MB', 3000);
    } else {
      if (inputfile) {
        const iAttachedFile: IAttachedFile = {
          id: null,
          file: inputfile,
          url: null,
          name: null,
          type: null,
        };

        this.uploadedFile = iAttachedFile;
        const reader = new FileReader();
        reader.onload = () => {
          this.fileSrc = reader.result as string;
        };
        reader.readAsDataURL(inputfile);
        this.fileUploaded = true;
      }
    }
  }

  submitForm(): void {
    this.createAsset();
  }

  createAsset(): void {
    this.subscriptions.push(
      this.adminStaticAssetsService.createAsset(this.buildFormData()).subscribe(() => {
        this.router.navigate(['/sys-admin', 'static-assets']).then(
          () => {
            this.libToastLogService.successDialog('Asset Upload Successfully!');
          },
          () => {},
        );
      }),
    );
  }

  buildFormData(): FormData {
    const formData: FormData = new FormData();
    const assetFormValue = this.assetForm.value;

    Object.keys(assetFormValue).forEach((key) => {
      if (assetFormValue[key] != null) {
        formData.append(`static_asset[${key}]`, assetFormValue[key]);
      }
    });
    Object.keys(this.uploadedFile).forEach((value) => {
      formData.append(`static_asset[file][${value}]`, this.uploadedFile[value]);
    });
    return formData;
  }
}
