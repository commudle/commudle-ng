import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-group-about',
  templateUrl: './community-group-about.component.html',
  styleUrls: ['./community-group-about.component.scss'],
})
export class CommunityGroupAboutComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  description;

  subscriptions: Subscription[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.communityGroup.description);
        this.setMeta();
      }),
    );
  }

  setMeta(): void {
    this.seoService.setTags(
      `About | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
