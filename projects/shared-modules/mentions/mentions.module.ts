import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MentionsListComponent } from './components/mentions-list/mentions-list.component';
import { MentionsDirective } from './directives/mentions.directive';


@NgModule({
  declarations: [
    MentionsListComponent,
    MentionsDirective
  ],
  exports: [
    MentionsDirective
  ],
  imports: [
    CommonModule
  ]
})
export class MentionsModule {
}
