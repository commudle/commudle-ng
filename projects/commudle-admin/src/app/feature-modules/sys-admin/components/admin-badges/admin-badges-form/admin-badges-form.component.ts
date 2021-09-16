import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SysAdminBadgesService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-badges.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBadge } from 'projects/shared-models/badge.model';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { Subscription } from 'rxjs';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-badges-form',
  templateUrl: './admin-badges-form.component.html',
  styleUrls: ['./admin-badges-form.component.scss']
})
export class AdminBadgesFormComponent implements OnInit {

  @ViewChild('inputImage') inputImage: ElementRef;

  badge: IBadge;
  badgeForm: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],
      badge_type: ['', Validators.required],
    },
  );
  uploadedImage: IAttachedFile;
  imageUploaded: boolean = false;
  subscriptions: Subscription[] = [];
  imageSrc: SafeResourceUrl;

  constructor(
    private sysAdminBadgesService : SysAdminBadgesService,
    private fb: FormBuilder,
    private libToastLogService: LibToastLogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  addImage(event: Event): void {
    const fileList: FileList = (event.target as HTMLInputElement).files;
    const inputImage: File = fileList.length ? fileList[0] : null;

    if( inputImage?.size > 2425190 ){
      this.libToastLogService.warningDialog('Files should be less than 2MB', 3000);
    }
    else if( inputImage?.type !== 'image/svg+xml' ){
      this.libToastLogService.warningDialog('Only .svg files are allowed', 3000);
    }
    else{
      if(inputImage){
        const iAttachedFile: IAttachedFile = {
          id: null,
          file: inputImage,
          url: null,
          name: null,
          type: null,
        };
        this.uploadedImage = iAttachedFile;
        this.imageUploaded = true;

        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        }
        reader.readAsDataURL(inputImage)
      }
    }
  }

  deleteImage(): void {
    if(this.imageUploaded){
      this.uploadedImage = null;
      this.imageUploaded = false;
      this.imageSrc = '';
      this.inputImage.nativeElement.value = '';
    }
  }

  submitForm(): void {
    if(!this.badge){
      this.createBadge();
    }
  }

  createBadge(): void {
    this.subscriptions.push(
      this.sysAdminBadgesService.createBadge(this.buildFormData()).subscribe(() => {
        this.router.navigate(['/sys-admin', 'badges']).then(
          () => {
            this.libToastLogService.successDialog('Created badge successfully!');
          },
          () => {}
        );
      })
    );
  }

  buildFormData(): FormData {
    const formData: FormData = new FormData();
    const badgeFormValue = this.badgeForm.value;

    Object.keys(badgeFormValue).forEach((key) => {
      if(badgeFormValue[key] != null){
        formData.append(`badge[${key}]`, badgeFormValue[key]);
      }
    });

    Object.keys(this.uploadedImage).forEach((value) => {
      formData.append(`badge[image][${value}]`, this.uploadedImage[value]);
    })

    return formData;
  }

}
