import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';

const routes = [
  {
    path: '',
    component: PricingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingRoutingModule {}
