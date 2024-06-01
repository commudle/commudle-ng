import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggenciesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-agencies/components/aggencies/aggencies.component';

const routes: Routes = [{ path: '', component: AggenciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
