import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMentionDirective } from './directives/mention-directive/mention.directive';
import { SuggestionBoxComponent } from './components/suggestion-box/suggestion-box.component';
import { NbAutocompleteModule } from '@nebular/theme';




@NgModule({
  declarations: [
    MyMentionDirective,
    SuggestionBoxComponent
  ],

  imports: [
    CommonModule,
    NbAutocompleteModule
  ],
  
  exports: [
    MyMentionDirective
  ],

  entryComponents: [
    SuggestionBoxComponent
  ]
})
export class MyMentionModule { }
