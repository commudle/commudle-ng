import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-create',
  templateUrl: './community-create.component.html',
  styleUrls: ['./community-create.component.scss']
})
export class CommunityCreateComponent implements OnInit, OnDestroy {
  communityGroupId;
  communityGroup: ICommunityGroup;
  communityForm = this.fb.group({
    name: ['', Validators.required],
    contact_email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communitiesService: CommunitiesService,
    private communityGroupsService: CommunityGroupsService,
    private toastLogService: LibToastLogService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.setTitle();
    this.activatedRoute.queryParams.subscribe(data => {
      if (data.community_group_id) {
        this.communityGroupId = data.community_group_id;
        this.getCommunityGroup(data.community_group_id);
      }
    });
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
  }

  setTitle() {
    this.title.setTitle(`Create Community`);
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

  createCommunity() {
    this.communitiesService.create(this.communityForm.value, this.communityGroupId).subscribe(
      data => {
        this.toastLogService.successDialog('Created! Please scroll down to add a team member to begin', 5000);
        this.router.navigate(["/admin/communities", data.slug]);
      }
    );
  }


  getCommunityGroup(communityGroupId) {
    this.communityGroupsService.show(communityGroupId).subscribe(
      data => {
        this.communityGroup = data;
      }
    );
  }

}
