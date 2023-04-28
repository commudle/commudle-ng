import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
@Component({
  selector: 'commudle-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  communityGroup: ICommunityGroup;

  tabs = [
    {
      route: './',
      title: 'Communities',
      icon: 'people',
    },
    {
      route: 'events',
      title: 'Events',
      icon: 'calendar',
    },
    {
      route: 'channels',
      title: 'Channels',
      icon: 'hash',
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.communityGroup = data.community_group;
      this.setMeta();
    });
  }

  setMeta() {
    this.seoService.setTags(
      `Communities - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
