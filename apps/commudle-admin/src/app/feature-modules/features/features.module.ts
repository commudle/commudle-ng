import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesIndexComponent } from './components/features-index/features-index.component';
import { FeaturesComponent } from './components/features/features.component';
import { NbCardModule, NbListModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FeaturesIndexComponent, FeaturesComponent],
  imports: [CommonModule, FeaturesRoutingModule, NbCardModule, NbListModule, FontAwesomeModule],
  exports: [],
})
export class FeaturesModule {}
