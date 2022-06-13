import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStaticAssetsService } from '../../../services/admin-static-assets.service';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { assets } from 'projects/shared-models/assets.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-static-asset-form',
  templateUrl: './admin-static-asset-form.component.html',
  styleUrls: ['./admin-static-asset-form.component.scss'],
})
export class AdminStaticAssetFormComponent implements OnInit {
  asset: assets;
  assetForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    asset: ['', Validators.required],
  });
  uploadFile: IAttachedFile;
  fileUploaded = false;
  subscriptions: Subscription[] = [];
  fileSrc: string;

  constructor(
    private adminStaticAssetsService: AdminStaticAssetsService,
    private fb: FormBuilder,
    private router: Router,
    private libToastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    this.createAsset();
    console.log('asset submit');
  }

  createAsset(): void {
    this.subscriptions.push(
      this.adminStaticAssetsService.createAsset(this.buildFormData()).subscribe(() => {
        this.router.navigate(['/sys-admin', 'static-asset']).then(
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
    const AssetFormValue = this.assetForm.value;

    Object.keys(AssetFormValue).forEach((key) => {
      if (AssetFormValue[key] != null) {
        formData.append(`asset[${key}]`, AssetFormValue[key]);
      }
    });

    Object.keys(this.uploadFile).forEach((value) => {
      formData.append(`asset[file][${value}]`, this.uploadFile[value]);
    });

    return formData;
  }
}
