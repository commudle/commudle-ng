import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggenciesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-agencies/components/aggencies/aggencies.component';
import { BookPageComponent } from 'apps/commudle-admin/src/app/feature-modules/public-book-page/components/book-page/book-page.component';

const routes: Routes = [{ path: '', component: AggenciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
