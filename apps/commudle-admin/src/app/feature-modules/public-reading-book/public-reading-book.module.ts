import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicReadingBookRoutingModule } from './public-reading-book-routing.module';
import { ReadingBookComponent } from 'apps/commudle-admin/src/app/feature-modules/public-reading-book/components/reading-book/reading-book.component';
import { NbButtonModule, NbCardModule, NbListModule, NbSidebarModule } from '@commudle/theme';
import { ReadingBookSidebarComponent } from './components/reading-book-sidebar/reading-book-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ReadingBookComponent, ReadingBookSidebarComponent],
  imports: [
    CommonModule,
    PublicReadingBookRoutingModule,
    NbSidebarModule,
    NbCardModule,
    NbListModule,
    FontAwesomeModule,
    NbButtonModule,
  ],
})
export class PublicReadingBookModule {}
