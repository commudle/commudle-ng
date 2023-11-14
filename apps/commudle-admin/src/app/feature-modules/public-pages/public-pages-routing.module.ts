import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggenciesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-pages/components/aggencies/aggencies.component';
import { BookPageComponent } from 'apps/commudle-admin/src/app/feature-modules/public-pages/components/book-page/book-page.component';

const routes: Routes = [
  { path: 'agencies', component: AggenciesComponent },
  { path: 'book', component: BookPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
