import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionDirective } from './directives/mention-directive/mention.directive';
import { SuggestionBoxComponent } from './components/suggestion-box/suggestion-box.component';
import { NbListModule } from '@nebular/theme';
import { EntityProfileComponent } from './components/entity-profile/entity-profile.component';




@NgModule({
  declarations: [
    MentionDirective,
    SuggestionBoxComponent,
    EntityProfileComponent
  ],

  imports: [
    CommonModule,

    //Nebular
    NbListModule
  ],
  
  exports: [
    MentionDirective
  ],

  entryComponents: [
    SuggestionBoxComponent,
    EntityProfileComponent
  ]
})
export class MentionModule { }
