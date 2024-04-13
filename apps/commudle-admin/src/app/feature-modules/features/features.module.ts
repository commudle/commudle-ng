import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './components/features/features.component';
import { FeaturesContentComponent } from './components/features-content/features-content.component';
import { NbCardModule, NbListModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FeaturesComponent, FeaturesContentComponent],
  imports: [CommonModule, FeaturesRoutingModule, NbCardModule, NbListModule, FontAwesomeModule],
  exports: [],
})
export class FeaturesModule {}
