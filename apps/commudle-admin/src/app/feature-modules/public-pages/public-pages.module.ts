import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { AggenciesComponent } from './components/aggencies/aggencies.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { NbButtonModule } from '@commudle/theme';
import { SharedComponentsModule } from '@commudle/shared-components';
import { BookPageComponent } from './components/book-page/book-page.component';

@NgModule({
  declarations: [AggenciesComponent, BookPageComponent],
  imports: [CommonModule, PublicPagesRoutingModule, AppSharedComponentsModule, NbButtonModule, SharedComponentsModule],
})
export class PublicPagesModule {}
