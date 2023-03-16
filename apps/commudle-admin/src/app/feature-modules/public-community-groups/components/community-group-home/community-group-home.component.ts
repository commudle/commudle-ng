import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';

@Component({
  selector: 'app-community-group-home',
  templateUrl: './community-group-home.component.html',
  styleUrls: ['./community-group-home.component.scss'],
})
export class CommunityGroupHomeComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  private subscriptions = [];
  communities: ICommunity[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communityGroupsService: CommunityGroupsService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
        console.log(this.communityGroup.slug);
        this.getCommunities(this.communityGroup.slug);
      }),
    );
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  setMeta(): void {
    this.seoService.setTags(
      this.communityGroup.name,
      this.communityGroup.description.replace(/<[^>]*>/g, ''),
      this.communityGroup.logo.url,
    );
  }

  getCommunities(communityGroupId) {
    this.communityGroupsService.pCommunities(communityGroupId).subscribe((data) => {
      console.log(data.communities);
    });
  }
}
