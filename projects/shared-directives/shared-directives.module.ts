import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from 'projects/shared-directives/click-outside.directive';
import { HighlightLinksDirective } from './highlight-links.directive';
import { LazyLoadImagesDirective } from './lazy-load-images.directive';

@NgModule({
  declarations: [ClickOutsideDirective, HighlightLinksDirective, LazyLoadImagesDirective],
  imports: [CommonModule],
  exports: [ClickOutsideDirective, HighlightLinksDirective, LazyLoadImagesDirective],
})
export class SharedDirectivesModule {}
