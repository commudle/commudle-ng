import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbToggleModule,
  NbTooltipModule,
} from '@commudle/theme';
import { CommudleFeaturesComponent } from './components/commudle-features/commudle-features.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { PricingRoutingModule } from './pricing-routing.module';

@NgModule({
  declarations: [PricingComponent, CommudleFeaturesComponent],
  imports: [
    CommonModule,
    PricingRoutingModule,

    // Nebular
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
    NbToggleModule,
  ],
})
export class PricingModule {}
