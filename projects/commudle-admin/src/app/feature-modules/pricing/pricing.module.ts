import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './components/pricing/pricing.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbTooltipModule } from '@nebular/theme';
import { CommudleFeaturesComponent } from './components/commudle-features/commudle-features.component';


@NgModule({
  declarations: [
    PricingComponent,
    CommudleFeaturesComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule,


    // Nebular
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule
  ]
})
export class PricingModule { }
