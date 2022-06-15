import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStaticAssetsService } from '../../../services/admin-static-assets.service';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { static_assets } from 'projects/shared-models/assets.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-static-asset-form',
  templateUrl: './admin-static-asset-form.component.html',
  styleUrls: ['./admin-static-asset-form.component.scss'],
})
export class AdminStaticAssetFormComponent implements OnInit {
  asset: static_assets;
  assetForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    asset: ['', Validators.required],
  });
  uploadedImage: IAttachedFile;
  imageUploaded = false;
  subscriptions: Subscription[] = [];
  imageSrc: string;

  @ViewChild('inputImage') inputImage: ElementRef;

  constructor(
    private adminStaticAssetsService: AdminStaticAssetsService,
    private fb: FormBuilder,
    private router: Router,
    private libToastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log(' works ');
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.getAssets(+params.AssetId || 0);
      }),
    );
  }

  getAssets(AssetId: number): void {
    if (AssetId >= 0) {
      this.subscriptions.push(
        this.adminStaticAssetsService.getAssetById(AssetId).subscribe((value) => {
          // console.log(value, 'prefile works under value');
          this.asset = value;
          this.prefillAsset();
        }),
      );
    }
  }

  prefillAsset(): void {
    // console.log(' prefill works');
    // console.log(this.asset.name);

    this.assetForm.patchValue({
      name: this.asset.name,
    });
    // console.log(this.asset.name);

    if (this.asset.file) {
      this.uploadedImage = this.asset.file;
      this.imageSrc = this.asset.file.url;
      this.imageUploaded = true;
    }
  }

  addImage(event: Event): void {
    const fileList: FileList = (event.target as HTMLInputElement).files;
    const inputImage: File = fileList.length ? fileList[0] : null;

    if (inputImage?.size > 2425190) {
      this.libToastLogService.warningDialog('Files should be less than 2MB', 3000);
    } else {
      if (inputImage) {
        const iAttachedFile: IAttachedFile = {
          id: null,
          file: inputImage,
          url: null,
          name: null,
          type: null,
        };

        this.uploadedImage = iAttachedFile;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          // console.log(this.imageSrc, 'onload');
        };
        reader.readAsDataURL(inputImage);
        this.imageUploaded = true;
        // console.log(this.imageUploaded, 'readAsDataURL');
      }
    }
  }

  submitForm(): void {
    this.createAsset();
    console.log('asset submit');
  }

  createAsset(): void {
    console.log('create works');
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
    console.log('build works');

    const formData: FormData = new FormData();
    const assetFormValue = this.assetForm.value;

    Object.keys(assetFormValue).forEach((key) => {
      // console.log(assetFormValue);

      if (assetFormValue[key] != null) {
        formData.append(`static_asset[${key}]`, assetFormValue[key]);
        // console.log(assetFormValue);
      }
    });

    Object.keys(this.uploadedImage).forEach((value) => {
      console.log(value);
      formData.append(`static_asset[file][${value}]`, this.uploadedImage[value]);
    });
    return formData;
  }
}
