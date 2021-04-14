import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleExtrnalFeedComponent } from './components/single-extrnal-feed/single-extrnal-feed.component';


const routes: Routes = [
  {
    path: '',
    component: SingleExtrnalFeedComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalFeedRoutingModule { }
