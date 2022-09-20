import { Component, Input, OnInit } from '@angular/core';
import { ICommunityBuild } from '@commudle/shared-models';

@Component({
  selector: 'commudle-home-builds-card',
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
