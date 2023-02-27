import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreakpointsDirective } from './breakpoints.directive';
import { ClickOutsideDirective } from './click-outside.directive';
import { HighlightLinksDirective } from './highlight-links.directive';
import { LazyLoadImagesDirective } from './lazy-load-images.directive';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    HighlightLinksDirective,
    LazyLoadImagesDirective,
    BreakpointsDirective,
    TextareaAutoresizeDirective,
  ],
  imports: [CommonModule],
  exports: [
    ClickOutsideDirective,
    HighlightLinksDirective,
    LazyLoadImagesDirective,
    BreakpointsDirective,
    TextareaAutoresizeDirective,
  ],
})
export class SharedDirectivesModule {}
