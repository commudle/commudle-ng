import { Component, Input, OnInit } from '@angular/core';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';

@Component({
  selector: 'app-home-builds-card',
  templateUrl: './home-builds-card.component.html',
  styleUrls: ['./home-builds-card.component.scss'],
})
export class HomeBuildsCardComponent implements OnInit {
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
