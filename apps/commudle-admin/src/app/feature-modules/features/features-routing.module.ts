import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from 'apps/commudle-admin/src/app/feature-modules/features/components/features/features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
  },
  {
    path: ':slug',
    component: FeaturesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
