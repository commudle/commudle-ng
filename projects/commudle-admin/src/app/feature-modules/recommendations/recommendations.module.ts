import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { RecommendedLabsComponent } from './components/recommended-labs/recommended-labs.component';

@NgModule({
  declarations: [RecommendedLabsComponent],
  imports: [CommonModule, NbCardModule, RouterModule],
  exports: [RecommendedLabsComponent],
})
export class RecommendationsModule {}
