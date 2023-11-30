import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicReadingBookRoutingModule } from './public-reading-book-routing.module';
import { ReadingBookComponent } from 'apps/commudle-admin/src/app/feature-modules/public-reading-book/components/reading-book/reading-book.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbSidebarModule } from '@commudle/theme';
import { ReadingBookIndexComponent } from './components/reading-book-index/reading-book-index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../../../../../shared-components/shared-components.module';

@NgModule({
  declarations: [ReadingBookComponent, ReadingBookIndexComponent],
  imports: [
    CommonModule,
    PublicReadingBookRoutingModule,
    FontAwesomeModule,
    SharedComponentsModule,

    //Nebular
    NbButtonModule,
    NbIconModule,
    NbSidebarModule,
    NbCardModule,
    NbListModule,
  ],
})
export class PublicReadingBookModule {}
