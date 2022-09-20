import { Component, Input, OnInit } from '@angular/core';
import { CBuildTypeDisplay, ICommunityBuild } from '@commudle/shared-models';

@Component({
  selector: 'commudle-community-build-card',
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
