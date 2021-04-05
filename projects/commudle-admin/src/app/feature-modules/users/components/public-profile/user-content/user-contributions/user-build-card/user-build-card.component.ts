import {Component, Input, OnInit} from '@angular/core';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';

@Component({
  selector: 'app-user-build-card',
  templateUrl: './user-build-card.component.html',
  styleUrls: ['./user-build-card.component.scss']
})
export class UserBuildCardComponent implements OnInit {

  @Input() build: ICommunityBuild;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDescription() {
    // Decode HTML
    const txt = document.createElement('textarea');
    txt.innerHTML = this.build.description;
    const htmlContent = txt.value;
    // Remove HTML tags, take the first 100 characters and add '...'
    return htmlContent.replace(/<[^>]+>/g, '').substr(0, 80).concat('...');
  }
}
