import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesIndexComponent } from './components/features-index/features-index.component';
import { FeaturesComponent } from './components/features/features.component';
import { NbButtonModule, NbCardModule, NbListModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturesContentComponent } from './components/features-content/features-content.component';
import { FeaturesHeaderComponent } from './components/features-header/features-header.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { SharedComponentsModule } from '@commudle/shared-components';

@NgModule({
  declarations: [FeaturesIndexComponent, FeaturesComponent, FeaturesContentComponent, FeaturesHeaderComponent],
  exports: [FeaturesComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NbCardModule,
    NbListModule,
    FontAwesomeModule,
    AppSharedComponentsModule,
    NbButtonModule,
    SharedComponentsModule,
  ],
})
export class FeaturesModule {}
