import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingBookComponent } from 'apps/commudle-admin/src/app/feature-modules/public-reading-book/components/reading-book/reading-book.component';

const routes: Routes = [
  {
    path: '',
    component: ReadingBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicReadingBookRoutingModule {}
