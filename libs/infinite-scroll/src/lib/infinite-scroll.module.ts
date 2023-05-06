import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective],
  imports: [CommonModule],
})
export class InfiniteScrollModule {}
