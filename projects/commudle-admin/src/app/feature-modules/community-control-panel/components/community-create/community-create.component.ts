import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-community-create',
  templateUrl: './community-create.component.html',
  styleUrls: ['./community-create.component.scss'],
})
export class CommunityCreateComponent implements OnInit, OnDestroy {
  communityGroupId;
  communityGroup: ICommunityGroup;
  communityForm = this.fb.group({
    name: ['', Validators.required],
    contact_email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communitiesService: CommunitiesService,
    private communityGroupsService: CommunityGroupsService,
    private toastLogService: LibToastLogService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.setTitle(`Create Community`);
    this.seoService.noIndex(true);

    this.activatedRoute.queryParams.subscribe((data) => {
      if (data.community_group_id) {
        this.communityGroupId = data.community_group_id;
        this.getCommunityGroup(data.community_group_id);
      }
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  createCommunity() {
    this.communitiesService.create(this.communityForm.value, this.communityGroupId).subscribe((data) => {
      this.toastLogService.successDialog('Created! Please scroll down to add a team member to begin', 5000);
      this.router.navigate(['/admin/communities', data.slug]);
    });
  }

  getCommunityGroup(communityGroupId) {
    this.communityGroupsService.show(communityGroupId).subscribe((data) => {
      this.communityGroup = data;
    });
  }
}
