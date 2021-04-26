import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';


const routes: Routes = [
  {
      path: '',
      component: ExternalFeedComponent,
  },
  {
    path: ':id',
    component: FeedItemComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalFeedRoutingModule { }