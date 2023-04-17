import { Component, OnInit } from '@angular/core';
import { MentionModel } from '../../models/mentions.model';
import { AngularNodeViewComponent } from '../node-view.component';

@Component({
  selector: 'commudle-mentions-node',
  templateUrl: './mentions-node.component.html',
  styleUrls: ['./mentions-node.component.scss'],
})
export class MentionsNodeComponent extends AngularNodeViewComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  redirect(): void {
    const model: MentionModel = this.node.attrs.model;
    switch (model) {
      case 'community':
        this.openInNewTab(`/communities/${this.node.attrs.slug}`);
        break;
      case 'user':
        this.openInNewTab(`/users/${this.node.attrs.username}`);
        break;
    }
  }

  openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
