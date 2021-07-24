import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightLinksDirective } from './highlight-links.directive';
import { LazyLoadImgDirective } from './lazyload-img.directive';


@NgModule({
  declarations: [
    HighlightLinksDirective,
    LazyLoadImgDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightLinksDirective,
    LazyLoadImgDirective
  ]
})
export class SharedDirectivesModule {
}
