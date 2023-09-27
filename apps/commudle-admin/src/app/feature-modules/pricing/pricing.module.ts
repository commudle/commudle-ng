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
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { SharedComponentsModule } from '@commudle/shared-components';

@NgModule({
  declarations: [PricingComponent, CommudleFeaturesComponent],
  imports: [
    CommonModule,
    PricingRoutingModule,
    AppSharedComponentsModule,
    // Nebular
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
    NbToggleModule,
    SharedComponentsModule,
  ],
})
export class PricingModule {}
