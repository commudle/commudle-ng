import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbIconModule, NbListModule, NbUserModule } from '@commudle/theme';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { popperVariation, provideTippyConfig, TippyDirective, tooltipVariation } from '@ngneat/helipopper';
import { EditorMenuComponent } from './components/editor/editor-menu/editor-menu.component';
import { EditorComponent } from './components/editor/editor.component';
import { MentionsListComponent } from './components/mentions-list/mentions-list.component';
import { MentionsNodeComponent } from './components/mentions-node/mentions-node.component';
import { BubbleMenuDirective } from './directives/bubble-menu.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { EditorDirective } from './directives/editor.directive';
import { FloatingMenuDirective } from './directives/floating-menu.directive';
import { NodeViewContentDirective } from './directives/node-view-content.directive';

@NgModule({
  imports: [CommonModule, NbListModule, NbUserModule, NbButtonModule, NbIconModule, PickerModule, TippyDirective],
  declarations: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective,
    DraggableDirective,
    NodeViewContentDirective,
    MentionsListComponent,
    MentionsNodeComponent,
    EditorComponent,
    EditorMenuComponent,
  ],
  exports: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective,
    DraggableDirective,
    NodeViewContentDirective,
    EditorComponent,
  ],
  providers: [
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      },
    }),
  ],
})
export class EditorModule {}
