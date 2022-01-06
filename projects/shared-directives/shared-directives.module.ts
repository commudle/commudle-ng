import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreakpointsDirective } from './breakpoints.directive';
import { ClickOutsideDirective } from './click-outside.directive';
import { HighlightLinksDirective } from './highlight-links.directive';
import { LazyLoadImagesDirective } from './lazy-load-images.directive';

@NgModule({
  declarations: [ClickOutsideDirective, HighlightLinksDirective, LazyLoadImagesDirective, BreakpointsDirective],
  imports: [CommonModule],
  exports: [ClickOutsideDirective, HighlightLinksDirective, LazyLoadImagesDirective, BreakpointsDirective],
})
export class SharedDirectivesModule {}
