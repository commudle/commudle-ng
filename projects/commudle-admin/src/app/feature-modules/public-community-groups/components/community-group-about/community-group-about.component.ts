import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';

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
    private meta: Meta,
    private title: Title
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
    this.title.setTitle(`About | ${this.communityGroup.name}`);
    this.meta.updateTag({ name: 'description', content: `${this.communityGroup.mini_description}`});


    this.meta.updateTag({ name: 'og:image', content: `About | ${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'og:image:secure_url', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'og:title', content: `About | ${this.communityGroup.name}` });
    this.meta.updateTag({ name: 'og:description', content: `${this.communityGroup.mini_description}`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'twitter:title', content: `About | ${this.communityGroup.name}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Fill the form for ${this.communityGroup.mini_description}`});
  }



}
