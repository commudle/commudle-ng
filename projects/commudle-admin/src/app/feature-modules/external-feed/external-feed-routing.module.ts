import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleExternalFeedComponent } from './components/single-external-feed/single-external-feed.component';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';


const routes: Routes = [
  {
      path: '',
      component: ExternalFeedComponent,
  },
  {
    path: ':id',
    component: SingleExternalFeedComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalFeedRoutingModule { }