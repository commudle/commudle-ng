import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SysAdminBadgesService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-badges.service';
import { IAttachedFile } from '@commudle/shared-models';
import { IBadge } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-admin-badges-form',
  templateUrl: './admin-badges-form.component.html',
  styleUrls: ['./admin-badges-form.component.scss'],
})
export class AdminBadgesFormComponent implements OnInit, OnDestroy {
  badge: IBadge;
  badgeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    badge_type: ['', Validators.required],
  });
  uploadedImage: IAttachedFile;
  imageUploaded = false;
  subscriptions: Subscription[] = [];
  imageSrc: string;

  @ViewChild('inputImage') inputImage: ElementRef;

  constructor(
    private sysAdminBadgesService: SysAdminBadgesService,
    private fb: FormBuilder,
    private libToastLogService: LibToastLogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.getBadge(+params.badgeId || 0);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getBadge(badgeId: number): void {
    if (badgeId > 0) {
      this.subscriptions.push(
        this.sysAdminBadgesService.getBadgeById(badgeId).subscribe((value) => {
          this.badge = value;
          this.prefillBadge();
        }),
      );
    }
  }

  prefillBadge(): void {
    this.badgeForm.patchValue({
      name: this.badge.name,
      badge_type: this.badge.badge_type,
    });

    if (this.badge.image) {
      this.uploadedImage = this.badge.image;
      this.imageSrc = this.badge.image.url;
      this.imageUploaded = true;
    }
  }

  addImage(event: Event): void {
    const fileList: FileList = (event.target as HTMLInputElement).files;
    const inputImage: File = fileList.length ? fileList[0] : null;

    if (inputImage?.size > 2425190) {
      this.libToastLogService.warningDialog('Files should be less than 2MB', 3000);
    } else if (inputImage?.type !== 'image/svg+xml') {
      this.libToastLogService.warningDialog('Only .svg files are allowed', 3000);
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
        };
        reader.readAsDataURL(inputImage);
        this.imageUploaded = true;
      }
    }
  }

  deleteImage(): void {
    if (this.imageSrc) {
      this.uploadedImage = null;
      this.imageUploaded = false;
      this.imageSrc = '';
      this.inputImage.nativeElement.value = '';
    }
  }

  submitForm(): void {
    if (!this.badge) {
      this.createBadge();
    } else {
      this.updateBadge();
    }
  }

  createBadge(): void {
    this.subscriptions.push(
      this.sysAdminBadgesService.createBadge(this.buildFormData()).subscribe(() => {
        this.router.navigate(['/sys-admin', 'badges']).then(
          () => {
            this.libToastLogService.successDialog('Created badge successfully!');
          },
          () => {},
        );
      }),
    );
  }

  updateBadge(): void {
    this.subscriptions.push(
      this.sysAdminBadgesService.updateBadge(this.buildFormData(), this.badge.id).subscribe(() => {
        this.router.navigate(['/sys-admin', 'badges']).then(
          () => {
            this.libToastLogService.successDialog('Updated badge successfully!');
          },
          () => {},
        );
      }),
    );
  }

  buildFormData(): FormData {
    const formData: FormData = new FormData();
    const badgeFormValue = this.badgeForm.value;

    Object.keys(badgeFormValue).forEach((key) => {
      if (badgeFormValue[key] != null) {
        formData.append(`badge[${key}]`, badgeFormValue[key]);
      }
    });

    Object.keys(this.uploadedImage).forEach((value) => {
      formData.append(`badge[image][${value}]`, this.uploadedImage[value]);
    });

    return formData;
  }
}
