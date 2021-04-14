import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleExtrnalFeedComponent } from './components/single-external-feed/single-external-feed.component';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';


const routes: Routes = [
  {
      path: '',
      component: ExternalFeedComponent,
  },
  {
    path: 'post',
    component: SingleExtrnalFeedComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalFeedRoutingModule { }