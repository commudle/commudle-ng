import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTextComponent } from './components/skeleton-text/skeleton-text.component';



@NgModule({
  declarations: [SkeletonTextComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SkeletonTextComponent
  ]
})
export class SkeletonScreensModule { }
