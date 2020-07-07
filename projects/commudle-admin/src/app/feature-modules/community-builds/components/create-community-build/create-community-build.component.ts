import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunityBuild, EBuildType, EProjectStatus, EPublishStatus } from 'projects/shared-models/community-build.model';


@Component({
  selector: 'app-create-community-build',
  templateUrl: './create-community-build.component.html',
  styleUrls: ['./create-community-build.component.scss']
})
export class CreateCommunityBuildComponent implements OnInit {

  cBuild: ICommunityBuild;
  buildTypes = Object.keys(EBuildType);
  projectStatuses = Object.keys(EProjectStatus);
  publishStatuses = Object.keys(EPublishStatus);

  communityBuildForm = this.fb.group({
    name: ['', Validators.required],
    build_type: ['', Validators.required],
    description: ['', Validators.required],
    project_status: [''],
    publish_status: ['', Validators.required],
    link: [''],
    contact: [''],
    open_sourced: [''],
    need_team: [''],
    images: ['']
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }



  submitForm() {

  }

  autoSaver() {
    setInterval(
      () => {

      }
    );
  }

}
