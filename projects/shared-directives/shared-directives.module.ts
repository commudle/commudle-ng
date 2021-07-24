import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';
import { HighlightLinksDirective } from './highlight-links.directive';


@NgModule({
  declarations: [
    HighlightLinksDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightLinksDirective,
    ClickOutsideDirective
  ]
})
export class SharedDirectivesModule {
}
