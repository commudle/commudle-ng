import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PoliciesComponent } from 'apps/commudle-admin/src/app/feature-modules/policies/component/policies/policies.component';

const routes = [
  {
    path: ':policy_slug',
    component: PoliciesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliciesRoutingModule {}
