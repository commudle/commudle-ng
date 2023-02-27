import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTextComponent } from './components/skeleton-text/skeleton-text.component';
import { SkeletonCardsComponent } from './components/skeleton-cards/skeleton-cards.component';

@NgModule({
  declarations: [SkeletonTextComponent, SkeletonCardsComponent],
  imports: [CommonModule],
  exports: [SkeletonTextComponent, SkeletonCardsComponent],
})
export class SkeletonScreensModule {}
