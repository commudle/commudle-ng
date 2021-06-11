import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { Meta, Title } from '@angular/platform-browser';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';

@Component({
  selector: 'app-community-group-communities',
  templateUrl: './community-group-communities.component.html',
  styleUrls: ['./community-group-communities.component.scss']
})
export class CommunityGroupCommunitiesComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  communities: ICommunity[] = [];
  communityGroup: ICommunityGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      data => {
        this.getCommunities(data.community_group_id);
      }
    ));

    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe(
        data => {
          this.communityGroup = data.community_group;
          this.setMeta();
        }
      )
    )
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getCommunities(communityGroupId) {
    this.communityGroupsService.pCommunities(communityGroupId).subscribe(
      data => {
        this.communities = data.communities;
      }
    );
  }

  setMeta() {
    this.title.setTitle(`${this.communityGroup.name}`);
    this.meta.updateTag({ name: 'description', content: `${this.communityGroup.mini_description}`});


    this.meta.updateTag({ name: 'og:image', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'og:image:secure_url', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'og:title', content: `${this.communityGroup.name}` });
    this.meta.updateTag({ name: 'og:description', content: `${this.communityGroup.mini_description}`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.communityGroup.name}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Fill the form for ${this.communityGroup.mini_description}`});
  }

}
