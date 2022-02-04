import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
  NbUserModule,
} from '@nebular/theme';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';

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
    NbCheckboxModule,
    NbListModule,
  ],
  exports: [SearchBoxComponent],
})
export class SearchModule {}
