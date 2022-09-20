import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { EBuildType, EPublishStatus, ICommunityBuild } from 'projects/shared-models/community-build.model';
import { EUserRolesUserStatus, IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-community-build',
  templateUrl: './create-community-build.component.html',
  styleUrls: ['./create-community-build.component.scss'],
})
export class CreateCommunityBuildComponent implements OnInit, OnDestroy {
  eUserRolesUserStatus = EUserRolesUserStatus;
  cBuild: ICommunityBuild;
  tags: string[] = [];
  teammates: IUserRolesUser[] = [];
  linkFieldLabel = 'Any Link?';
  EBuildType = EBuildType;
  EPublishStatus = EPublishStatus;
  redirectTo;
  form: FormGroup;
  embeddedLink;
  uploadedImagesFiles: IAttachedFile[] = [];
  uploadedImages = [];
  buildTypes = Object.keys(EBuildType);

  communityBuildForm = this.fb.group({
    name: ['', Validators.required],
    build_type: ['', Validators.required],
    description: ['', Validators.required],
    publish_status: [EPublishStatus.draft, Validators.required],
    link: ['', [this.validateLink()]],
    live_app_link: ['', [this.validateLink()]],
    video_iframe: ['', [this.embedded()]],
    team: this.fb.array([]),
  });

  subscriptions: Subscription[] = [];

  constructor(
    private seoService: SeoService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communityBuildsService: CommunityBuildsService,
    private toastLogService: LibToastLogService,
  ) {}

  get emailList() {
    return this.communityBuildForm.get('team') as FormArray;
  }

  ngOnInit() {
    this.seoService.setTags(
      'Publish a Project - Builds',
      'Publish your project (from your first script to a complete web or mobile app) with link to open source code, live deployment, screenshots and description. Add teammates too!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );

    this.getCommunityBuild();
    this.setBuildType();
    this.linkDisplay();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  validateLink(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const link: string = control.value;
      if (link) {
        if (link.startsWith('http://') || link.startsWith('https://')) {
          return null;
        } else {
          return { invalidLink: true };
        }
      }
      return null;
    };
  }

  embedded(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const link: string = control.value;
      if (link) {
        if (link.startsWith('<iframe') && link.endsWith('</iframe>')) {
          return null;
        } else {
          return { invalidLink: true };
        }
      }
      return null;
    };
  }

  addTeammate() {
    this.emailList.push(this.fb.group({ value: new FormControl('', [Validators.required, Validators.email]) }));
  }

  removeTeammate(index) {
    this.emailList.removeAt(index);
  }

  getCommunityBuild() {
    this.activatedRoute.params.subscribe((data: Params) => {
      const cbId = data.community_build_id;
      if (cbId) {
        this.communityBuildsService.show(cbId).subscribe((data: ICommunityBuild) => {
          this.cBuild = data;
          this.prefillCommunityBuild();
          this.tags = data.tags;
        });
      }
    });
  }

  sendInvitationMail(userRolesUser) {
    this.communityBuildsService.resendTeammateInvite(this.cBuild.id, userRolesUser.id).subscribe(() => {
      this.toastLogService.successDialog('Invite sent again!');
    });
  }

  removeTeamMember(userRolesUser, index) {
    this.communityBuildsService.removeTeammate(this.cBuild.id, userRolesUser.id).subscribe(() => {
      this.teammates.splice(index, 1);
      this.toastLogService.successDialog('Teammate Removed!');
    });
  }

  prefillCommunityBuild() {
    this.communityBuildForm.patchValue(this.cBuild);
    this.setBuildType();

    for (const img of this.cBuild.images) {
      this.uploadedImagesFiles.push({
        id: img.id,
        file: null,
        url: img.url,
        name: null,
        type: null,
      });

      this.uploadedImages.push(img.url);
    }

    this.teammates = this.cBuild.user_roles_users;
    this.teammates.sort((a, b) => a.status.localeCompare(b.status));
  }

  setBuildType() {
    const val = this.communityBuildForm.get('build_type').value;
    switch (val) {
      // case EBuildType.slides: {
      //   this.linkFieldLabel = 'Iframe for Embedding OR Link*';
      //   break;
      // }
      default: {
        this.linkFieldLabel = 'Any Link?';
        this.embeddedLink = null;
      }
    }
  }

  linkDisplay() {
    this.communityBuildForm.get('video_iframe').valueChanges.subscribe((val) => {
      if (val && val.startsWith('<iframe') && val.endsWith('</iframe>')) {
        this.embeddedLink = this.sanitizer.bypassSecurityTrustHtml(val);
      } else {
        this.embeddedLink = null;
      }
    });
  }

  addImages(event) {
    if (event.target.files && event.target.files.length > 0) {
      for (const file of event.target.files) {
        if (file.size > 2425190) {
          this.toastLogService.warningDialog('Image should be less than 2 Mb', 3000);
          return;
        }
        const imgFile: IAttachedFile = {
          id: null,
          file: file,
          url: null,
          name: null,
          type: null,
        };
        this.uploadedImagesFiles.push(imgFile);
        const reader = new FileReader();
        reader.onload = () => this.uploadedImages.push(reader.result);
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index) {
    if (this.uploadedImagesFiles[index]['id']) {
      this.uploadedImagesFiles[index]['delete'] = true;
    } else {
      this.uploadedImagesFiles.splice(index, 1);
      this.uploadedImages.splice(index, 1);
    }
  }

  submitForm(publishStatus: EPublishStatus) {
    if (!this.cBuild) {
      this.createCommunityBuild(publishStatus);
    } else {
      this.updateCommunityBuild(publishStatus);
    }
  }

  buildFormData(publishStatus): FormData {
    const formData: any = new FormData();
    const cBuildFormValue = this.communityBuildForm.value;

    Object.keys(cBuildFormValue).forEach((key: string) => {
      if (cBuildFormValue[key] != null && key != 'team') {
        formData.append(`community_build[${key}]`, cBuildFormValue[key]);
      }
    });

    if (this.cBuild && this.cBuild.publish_status === EPublishStatus.published) {
      formData.append('community_build[publish_status]', this.cBuild.publish_status);
    } else {
      formData.append('community_build[publish_status]', publishStatus);
    }

    for (let i = 0; i < this.uploadedImagesFiles.length; i++) {
      Object.keys(this.uploadedImagesFiles[i]).forEach((key: string) =>
        formData.append(`community_build[images][][${key}]`, this.uploadedImagesFiles[i][key]),
      );
    }

    for (let entries in cBuildFormValue['team']) {
      formData.append(`community_build[team][][value]`, cBuildFormValue['team'][entries]['value']);
    }

    return formData;
  }

  createCommunityBuild(publishStatus: EPublishStatus) {
    this.communityBuildsService.create(this.buildFormData(publishStatus)).subscribe((data: ICommunityBuild) => {
      this.cBuild = data;
      this.submitTags();
    });
  }

  updateCommunityBuild(publishStatus: EPublishStatus) {
    this.communityBuildsService
      .update(this.cBuild.id, this.buildFormData(publishStatus))
      .subscribe((data: ICommunityBuild) => {
        this.cBuild = data;
        this.submitTags();
      });
  }

  onTagAdd(value: string) {
    if (!this.tags.includes(value)) {
      this.tags.push(value);
    }
  }

  onTagDelete(value: string) {
    this.tags = this.tags.filter((tag: string) => tag !== value);
  }

  submitTags() {
    this.communityBuildsService.updateTags(this.cBuild.id, this.tags).subscribe(() => {
      this.router.navigate(['/builds/my-builds']).then(() => this.toastLogService.successDialog('Saved!'));
    });
  }
}
