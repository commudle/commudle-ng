import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMentionDirective } from './directives/mention-directive/mention.directive';
import { SuggestionBoxComponent } from './components/suggestion-box/suggestion-box.component';
import { NbListModule } from '@nebular/theme';
import { EntityProfileComponent } from './components/entity-profile/entity-profile.component';




@NgModule({
  declarations: [
    MyMentionDirective,
    SuggestionBoxComponent,
    EntityProfileComponent
  ],

  imports: [
    CommonModule,

    //Nebular
    NbListModule
  ],
  
  exports: [
    MyMentionDirective
  ],

  entryComponents: [
    SuggestionBoxComponent,
    EntityProfileComponent
  ]
})
export class MyMentionModule { }
