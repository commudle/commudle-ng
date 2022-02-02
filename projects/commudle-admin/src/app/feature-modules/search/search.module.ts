import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbFormFieldModule, NbIconModule, NbInputModule, NbUserModule } from '@nebular/theme';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    NbInputModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
  ],
  exports: [SearchBoxComponent],
})
export class SearchModule {}
