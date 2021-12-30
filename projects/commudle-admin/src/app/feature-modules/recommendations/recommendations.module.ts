import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { RecommendedBuildsComponent } from './components/recommended-builds/recommended-builds.component';
import { RecommendedCommunitiesComponent } from './components/recommended-communities/recommended-communities.component';
import { RecommendedLabsComponent } from './components/recommended-labs/recommended-labs.component';

@NgModule({
  declarations: [RecommendedLabsComponent, RecommendedBuildsComponent, RecommendedCommunitiesComponent],
  imports: [CommonModule, NbCardModule, RouterModule],
  exports: [RecommendedLabsComponent, RecommendedBuildsComponent, RecommendedCommunitiesComponent],
})
export class RecommendationsModule {}
