import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [InfiniteScrollDirective],
  imports: [CommonModule],
  exports: [InfiniteScrollDirective],
})
export class InfiniteScrollModule {}
