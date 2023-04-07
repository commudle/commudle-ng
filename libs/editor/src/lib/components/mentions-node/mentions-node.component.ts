import { Component } from '@angular/core';
import { AngularNodeViewComponent } from '../node-view.component';

@Component({
  selector: 'commudle-mentions-node',
  templateUrl: './mentions-node.component.html',
  styleUrls: ['./mentions-node.component.scss'],
})
export class MentionsNodeComponent extends AngularNodeViewComponent {}
