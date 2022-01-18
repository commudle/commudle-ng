import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-community-group-about',
  templateUrl: './community-group-about.component.html',
  styleUrls: ['./community-group-about.component.scss']
})
export class CommunityGroupAboutComponent implements OnInit {
  communityGroup: ICommunityGroup;
  subscriptions = [];

  description;
  constructor(
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private seoService : SeoService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.parent.data.subscribe(
      data => {
        this.communityGroup = data.community_group;
        this.setMeta();
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.communityGroup.description);

      }
    ));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  setMeta() {
    this.seoService.setTags(
      `About | ${this.communityGroup.name}`,
      `${this.communityGroup.mini_description}`,
      `${this.communityGroup.logo.i350}`
    );
  }



}
