import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunityBuild, EBuildType, EProjectStatus, EPublishStatus } from 'projects/shared-models/community-build.model';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';


@Component({
  selector: 'app-create-community-build',
  templateUrl: './create-community-build.component.html',
  styleUrls: ['./create-community-build.component.scss']
})
export class CreateCommunityBuildComponent implements OnInit {

  cBuild: ICommunityBuild;
  tags;
  linkFieldLabel = 'Link*';
  EBuildType = EBuildType;
  EProjectStatus = EProjectStatus;
  EPublishStatus = EPublishStatus;

  embeddedLink;
  teamNeeded = true;
  uploadedImagesFiles = [];
  uploadedImages = [];
  buildTypes = Object.keys(EBuildType);
  projectStatuses = Object.keys(EProjectStatus);
  publishStatuses = Object.keys(EPublishStatus);

  communityBuildForm = this.fb.group({
    name: ['', Validators.required],
    build_type: ['', Validators.required],
    description: ['', Validators.required],
    project_status: [''],
    publish_status: [EPublishStatus.draft, Validators.required],
    link: ['', Validators.required],
    contact: [''],
    open_sourced: [''],
    need_team: [''],
    images: ['']
  });


  constructor(
    private title: Title,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private communityBuildsService: CommunityBuildsService
  ) { }

  ngOnInit() {
    this.setBuildType();
    this.linkDisplay();

    this.title.setTitle('Share Your Build!');
  }


  setBuildType() {
    const val = this.communityBuildForm.get('build_type').value;
    switch (val) {
      case EBuildType.slides: {
        this.linkFieldLabel = 'Iframe for Embedding OR Link*';
        this.teamNeeded = false;
        break;
      }
      default: {
        this.linkFieldLabel = 'Link*';
        this.teamNeeded = true;
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
        this.uploadedImagesFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImages.push(reader.result);
        };
        reader.readAsDataURL(file);
      }

    }
  }

  removeImages(index) {

  }



  submitForm(publishStatus: EPublishStatus) {
    this.communityBuildsService.create(this.communityBuildForm.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  autoSaver() {
    setInterval(
      () => {

      }, 10000
    );
  }


  submitTags() {

  }

}
