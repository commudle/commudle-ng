import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicBookPageRoutingModule } from './public-book-page-routing.module';
import { BookPageComponent } from 'apps/commudle-admin/src/app/feature-modules/public-book-page/components/book-page/book-page.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '@commudle/shared-components';
import { NbButtonModule } from '@commudle/theme';

@NgModule({
  declarations: [BookPageComponent],
  imports: [
    CommonModule,
    PublicBookPageRoutingModule,
    AppSharedComponentsModule,
    SharedComponentsModule,

    //FontAwesome
    FontAwesomeModule,

    //Nebular
    NbButtonModule,
  ],
})
export class PublicBookPageModule {}
