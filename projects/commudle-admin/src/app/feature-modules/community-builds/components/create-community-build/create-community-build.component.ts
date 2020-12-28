import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunityBuild, EBuildType, EPublishStatus } from 'projects/shared-models/community-build.model';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Component({
  selector: 'app-create-community-build',
  templateUrl: './create-community-build.component.html',
  styleUrls: ['./create-community-build.component.scss']
})
export class CreateCommunityBuildComponent implements OnInit {

  cBuild: ICommunityBuild;
  tags = '';
  linkFieldLabel = 'Any Link?';
  EBuildType = EBuildType;
  EPublishStatus = EPublishStatus;
  redirectTo;

  embeddedLink;
  uploadedImagesFiles: IAttachedFile[] = [];
  uploadedImages = [];
  buildTypes = Object.keys(EBuildType);
  publishStatuses = Object.keys(EPublishStatus);

  communityBuildForm = this.fb.group({
    name: ['', Validators.required],
    build_type: ['', Validators.required],
    description: ['', Validators.required],
    publish_status: [EPublishStatus.draft, Validators.required],
    link: ['']
  });


  constructor(
    private title: Title,
    private meta: Meta,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communityBuildsService: CommunityBuildsService,
    private toastLogService: LibToastLogService
  ) { }

  setMeta() {
    this.meta.updateTag({
      name: 'description',
      content: `Project, Slides from a Session, an Online Course, share it all with the community!`
    });
    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({ name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({ name: 'og:title', content: `Share Your Build | Community Builds` });
    this.meta.updateTag({
      name: 'og:description',
      content: `Project, Slides from a Session, an Online Course, share it all with the community!`
    });
    this.meta.updateTag({ name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({ name: 'twitter:title', content: `Share Your Build | Community Builds` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `Project, Slides from a Session, an Online Course, share it all with the community!`
    });
  }

  ngOnInit() {
    this.getCommunityBuild();
    this.setBuildType();
    this.linkDisplay();

    this.title.setTitle('Share Your Build!');
    this.setMeta();
  }


  getCommunityBuild() {
    this.activatedRoute.params.subscribe(data => {
      const cbId = data.community_build_id;
      if (cbId) {
        this.communityBuildsService.show(cbId).subscribe(
          data => {
            this.cBuild = data;
            this.title.setTitle(`${this.cBuild.name} | Edit`);
            this.prefillCommunityBuild();
            this.tags = data.tags.toString();
          }
        );
      }
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
        type: null
      });

      this.uploadedImages.push(img.url);
    }
  }


  setBuildType() {
    const val = this.communityBuildForm.get('build_type').value;
    switch (val) {
      case EBuildType.slides: {
        this.linkFieldLabel = 'Iframe for Embedding OR Link*';
        break;
      }
      default: {
        this.linkFieldLabel = 'Any Link?';
        this.embeddedLink = null;
      }
    }
  }


  linkDisplay() {
    this.communityBuildForm.get('link').valueChanges.subscribe(val => {
      if (val.startsWith('<iframe') && val.endsWith("</iframe>")) {
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
          type: null
        };
        this.uploadedImagesFiles.push(imgFile);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImages.push(reader.result);
        };
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
    Object.keys(cBuildFormValue).forEach(
      key => (!(cBuildFormValue[key] == null) ? formData.append(`community_build[${key}]`, cBuildFormValue[key]) : '')
      );


    if (this.cBuild && this.cBuild.publish_status === EPublishStatus.published) {
      formData.append('community_build[publish_status]', this.cBuild.publish_status);
    } else {
      formData.append('community_build[publish_status]', publishStatus);
    }


    for (let i = 0; i < this.uploadedImagesFiles.length; i++) {
      Object.keys(this.uploadedImagesFiles[i]).forEach(
        key => formData.append(`community_build[images][][${key}]`, this.uploadedImagesFiles[i][key])
        );
    }

    return formData;
  }


  createCommunityBuild(publishStatus: EPublishStatus) {
    this.communityBuildsService.create(this.buildFormData(publishStatus)).subscribe(
      data => {
        this.cBuild = data;
        this.submitTags();
      }
    );
  }


  updateCommunityBuild(publishStatus: EPublishStatus) {
    this.communityBuildsService.update(this.cBuild.id, this.buildFormData(publishStatus)).subscribe(
      data => {
        this.cBuild = data;
        this.submitTags();
      }
    );
  }


  submitTags() {
    this.communityBuildsService.updateTags(this.cBuild.id, this.tags.split(',')).subscribe(
      data => {
        this.router.navigate(['/builds/my-builds']);
        this.toastLogService.successDialog('Saved!');
      }
    );
  }

}
