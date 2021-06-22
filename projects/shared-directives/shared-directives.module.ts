import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightLinksDirective } from './highlight-links.directive';


@NgModule({
  declarations: [
    HighlightLinksDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightLinksDirective
  ]
})
export class SharedDirectivesModule {
}
