import { Component, Input, OnInit } from '@angular/core';
import { CBuildTypeDisplay, ICommunityBuild } from 'projects/shared-models/community-build.model';

@Component({
  selector: 'app-community-build-card',
  templateUrl: './community-build-card.component.html',
  styleUrls: ['./community-build-card.component.scss'],
})
export class CommunityBuildCardComponent implements OnInit {
  @Input() communityBuild: ICommunityBuild;

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
