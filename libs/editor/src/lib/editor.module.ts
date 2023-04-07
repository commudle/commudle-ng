import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MentionsListComponent } from './components/mentions-list/mentions-list.component';
import { MentionsNodeComponent } from './components/mentions-node/mentions-node.component';
import { BubbleMenuDirective } from './directives/bubble-menu.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { EditorDirective } from './directives/editor.directive';
import { FloatingMenuDirective } from './directives/floating-menu.directive';
import { NodeViewContentDirective } from './directives/node-view-content.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective,
    DraggableDirective,
    NodeViewContentDirective,
    MentionsListComponent,
    MentionsNodeComponent,
  ],
  exports: [EditorDirective, FloatingMenuDirective, BubbleMenuDirective, DraggableDirective, NodeViewContentDirective],
})
export class EditorModule {}
