import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightLinksDirective } from './highlight-links.directive';
import { LazyLoadImagesDirective } from './lazy-load-images.directive';


@NgModule({
  declarations: [
    HighlightLinksDirective,
    LazyLoadImagesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightLinksDirective,
    LazyLoadImagesDirective
  ]
})
export class SharedDirectivesModule {
}
