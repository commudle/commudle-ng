import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
  NbTagModule,
  NbUserModule,
} from '@commudle/theme';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';

@NgModule({
  declarations: [SearchBoxComponent, SearchPageComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    NbInputModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NbListModule,
    NbTagModule,
    SharedDirectivesModule,
  ],
  exports: [SearchBoxComponent],
})
export class SearchModule {}
