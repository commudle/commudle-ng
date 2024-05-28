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
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { IAttachedFile } from 'apps/shared-models/attached-file.model';
import { EBuildType, EPublishStatus, ICommunityBuild } from 'apps/shared-models/community-build.model';
import { EUserRolesUserStatus, IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { EDbModels } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { EntityUpdatesService } from 'apps/commudle-admin/src/app/services/entity-updates.service';
import moment from 'moment';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';

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
  linkOrLiveAppLinkValue = false;
  showTagsValidation = false;

  paramsTags = [];
  faEdit = faEdit;

  communityBuildForm;
  communityBuildUpdateForm;
  moment = moment;

  tinyMCE = {
    min_height: 500,
    menubar: false,
    convert_urls: false,
    placeholder:
      'Write about what this build is about, why did you build it, how can it be useful for others. Add any relevant links too.',
    plugins: [
      'advlist',
      'lists',
      'autolink',
      'link',
      'charmap',
      'preview',
      'anchor',
      'visualblocks',
      'code',
      'table',
      'charmap',
      'insertdatetime',
      'table',
      'code',
      'help',
      'wordcount',
      'autoresize',
    ],
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    toolbar:
      'formatselect | bold italic backcolor | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | charmap | removeformat | help',
    default_link_target: '_blank',
    branding: false,
    license_key: 'gpl',
  };

  tinyMCEForUpdate = {
    min_height: 50,
    menubar: false,
    width: '500',
    placeholder: 'Updates',
    statusbar: false,
    toolbar: false,
    plugins: ['autoresize'],
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    convert_urls: false,
    branding: false,
    license_key: 'gpl',
  };

  subscriptions: Subscription[] = [];
  parentId: number;
  parentType: EDbModels;
  hackathonUserResponses: IHackathonUserResponses;
  currentUser: ICurrentUser;

  constructor(
    private seoService: SeoService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communityBuildsService: CommunityBuildsService,
    private toastLogService: LibToastLogService,
    private gtm: GoogleTagManagerService,
    private hackathonService: HackathonService,
    private entityUpdatesService: EntityUpdatesService,
    private authWatchService: LibAuthwatchService,
  ) {
    this.communityBuildForm = this.fb.group({
      name: ['', Validators.required],
      build_type: ['', Validators.required],
      description: ['', Validators.required],
      publish_status: [EPublishStatus.draft, Validators.required],
      link: ['', [this.validateLink()]],
      live_app_link: ['', [this.validateLink()]],
      video_iframe: ['', [this.embedded()]],
      team: this.fb.array([]),
    });
    this.communityBuildUpdateForm = this.fb.group({
      update: this.fb.array([]),
    });
  }

  get emailList() {
    return this.communityBuildForm.get('team') as FormArray;
  }

  get updateList() {
    return this.communityBuildUpdateForm.get('update') as FormArray;
  }

  ngOnInit() {
    this.seoService.setTags(
      'Publish a Project - Builds',
      'Publish your project (from your first script to a complete web or mobile app) with link to open source code, live deployment, screenshots and description. Add teammates too!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );

    this.paramsTags = this.activatedRoute.snapshot.queryParamMap.getAll('tags[]');
    this.activatedRoute.snapshot.queryParamMap;
    this.getCommunityBuild();
    this.setBuildType();
    this.linkDisplay();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;
    });
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
          this.tags = this.tags.concat(this.paramsTags);
        });
      } else {
        this.tags = this.tags.concat(this.paramsTags);
      }
      this.getParent();
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
    if (
      this.communityBuildForm.invalid ||
      this.tags.length < 5 ||
      !(this.communityBuildForm.value.link || this.communityBuildForm.value.live_app_link)
    ) {
      this.communityBuildForm.markAllAsTouched();
      this.linkOrLiveAppLinkValue = true;
      this.showTagsValidation = true;
      return;
    }

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

    for (const entries in cBuildFormValue['team']) {
      formData.append(`community_build[team][][value]`, cBuildFormValue['team'][entries]['value']);
    }

    return formData;
  }

  createCommunityBuild(publishStatus: EPublishStatus) {
    this.communityBuildsService
      .create(this.buildFormData(publishStatus), this.parentId, this.parentType)
      .subscribe((data: ICommunityBuild) => {
        this.cBuild = data;
        this.submitTags();
        if (this.communityBuildUpdateForm.value) {
          this.saveUpdates(this.cBuild);
        }
      });
  }

  updateCommunityBuild(publishStatus: EPublishStatus) {
    this.communityBuildsService
      .update(this.cBuild.id, this.buildFormData(publishStatus), this.parentId, this.parentType)
      .subscribe((data: ICommunityBuild) => {
        this.cBuild = data;
        this.submitTags();
        if (this.communityBuildUpdateForm.value) {
          this.saveUpdates(this.cBuild);
        }
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
      this.gtmService();
    });
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('submit-build', {
      com_build_name: this.cBuild.name,
      com_build_category: this.cBuild.build_type,
      com_build_id: this.cBuild.id,
      com_build_tags: this.tags.toString(),
      com_build_submit_type: this.cBuild.publish_status,
    });
  }

  getParent() {
    this.activatedRoute.queryParams.subscribe((data: Params) => {
      this.parentId = data['parent_id'];
      this.parentType = data['parent_type'];
      if (this.parentType === EDbModels.HACKATHON_TEAM) {
        this.hackathonService.showUserResponsesByTeam(this.parentId).subscribe((data) => {
          this.hackathonUserResponses = data;
        });
      }
    });
  }

  addUpdate() {
    this.updateList.push(this.fb.group({ value: new FormControl('', [Validators.required]) }));
  }

  removeUpdate(index) {
    this.updateList.removeAt(index);
  }

  saveUpdates(communityBuild) {
    for (const update of this.communityBuildUpdateForm.value.update) {
      const formData = new FormData();
      formData.append('entity_update[details]', update.value);
      this.entityUpdatesService
        .createEntityUpdate(formData, communityBuild.id, EDbModels.COMMUNITY_BUILD)
        .subscribe((data) => {});
    }
  }

  removeEntityUpdate(updateId, index) {
    this.entityUpdatesService.deleteEntityUpdate(updateId).subscribe((data) => {
      if (data) this.hackathonUserResponses.team.entity_updates.splice(index, 1);
    });
  }
}
