import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-community-group-home',
  templateUrl: './community-group-home.component.html',
  styleUrls: ['./community-group-home.component.scss'],
})
export class CommunityGroupHomeComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  private subscriptions = [];

  constructor(private activatedRoute: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
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
}
