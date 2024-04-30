import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesIndexComponent } from './components/features-index/features-index.component';
import { FeaturesComponent } from './components/features/features.component';
import { NbCardModule, NbListModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturesContentComponent } from './components/features-content/features-content.component';

@NgModule({
  declarations: [FeaturesIndexComponent, FeaturesComponent, FeaturesContentComponent],
  imports: [CommonModule, FeaturesRoutingModule, NbCardModule, NbListModule, FontAwesomeModule],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
