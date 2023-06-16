import { Component, Input, OnInit } from '@angular/core';
import { CBuildTypeDisplay, ICommunityBuild } from 'apps/shared-models/community-build.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import * as moment from 'moment';

@Component({
  selector: 'app-community-build-card',
  templateUrl: './community-build-card.component.html',
  styleUrls: ['./community-build-card.component.scss'],
})
export class CommunityBuildCardComponent implements OnInit {
  @Input() communityBuild: ICommunityBuild;
  staticAssets = staticAssets;
  moment = moment;

  CBuildTypeDisplay = CBuildTypeDisplay;

  constructor() {}

  ngOnInit(): void {}

  getDescription(): string {
    // Get description from html
    const description = document.createElement('div');
    description.innerHTML = this.communityBuild.description;
    return description.textContent || description.innerText;
  }
}
