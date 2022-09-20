import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedPipesModule } from '@commudle/shared-pipes';
import { NbListModule } from '@nebular/theme';
import { EntityProfileComponent } from './components/entity-profile/entity-profile.component';
import { SuggestionBoxComponent } from './components/suggestion-box/suggestion-box.component';
import { MentionDirective } from './directives/mention.directive';

@NgModule({
  declarations: [MentionDirective, SuggestionBoxComponent, EntityProfileComponent],
  imports: [CommonModule, SharedPipesModule, NbListModule],
  exports: [MentionDirective],
})
export class MentionModule {}
