import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesContentComponent } from 'apps/commudle-admin/src/app/feature-modules/features/components/features-content/features-content.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesContentComponent,
  },
  {
    path: ':slug',
    component: FeaturesContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
