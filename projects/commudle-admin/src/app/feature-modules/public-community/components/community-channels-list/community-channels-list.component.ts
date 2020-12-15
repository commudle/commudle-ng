import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-community-channels-list',
  templateUrl: './community-channels-list.component.html',
  styleUrls: ['./community-channels-list.component.scss']
})
export class CommunityChannelsListComponent implements OnInit {
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.community = data.community;
      this.setMeta();
    });
  }

  setMeta() {
    this.title.setTitle(`Public Channels | ${this.community.name}`);
    this.meta.updateTag({ name: 'og:title', content: `Public Channels | ${this.community.name}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Public Channels | ${this.community.name}` });
  }

}
