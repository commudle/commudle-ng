import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeListEventsComponent } from './components/public-home-list-events/public-home-list-events.component';

const routes: Routes = [
  {
    path: '',
    component: PublicHomeListEventsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicHomeListEventsRoutingModule {}
