import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggenciesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-agencies/components/aggencies/aggencies.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { NbButtonModule, NbInputModule } from '@commudle/theme';
import { SharedComponentsModule } from '@commudle/shared-components';
import { BookPageComponent } from 'apps/commudle-admin/src/app/feature-modules/public-book-page/components/book-page/book-page.component';
import { BadgeComponent } from 'apps/shared-components/badge/badge.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicPagesRoutingModule } from 'apps/commudle-admin/src/app/feature-modules/public-agencies/public-agencies-routing.module';

@NgModule({
  declarations: [AggenciesComponent],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    AppSharedComponentsModule,
    NbButtonModule,
    SharedComponentsModule,
    BadgeComponent,

    //Nebular
    NbInputModule,
    NbButtonModule,

    //FontAwesome
    FontAwesomeModule,
  ],
})
export class PublicAgenciesModule {}
