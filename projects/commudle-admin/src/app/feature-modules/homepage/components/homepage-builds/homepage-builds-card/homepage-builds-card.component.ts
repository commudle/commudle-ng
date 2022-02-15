import { Component, Input, OnInit } from '@angular/core';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';

@Component({
  selector: 'app-homepage-builds-card',
  templateUrl: './homepage-builds-card.component.html',
  styleUrls: ['./homepage-builds-card.component.scss'],
})
export class HomepageBuildsCardComponent implements OnInit {
  @Input() build: ICommunityBuild;

  constructor() {}

  ngOnInit(): void {}

  getDescription(): string {
    // Decode HTML
    const txt = document.createElement('textarea');
    txt.innerHTML = this.build.description;
    const htmlContent = txt.value;
    // Remove HTML tags
    return htmlContent.replace(/<[^>]+>/g, '');
  }
}
