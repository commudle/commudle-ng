import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';

const routes = [
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
  exports: [RouterModule],
})
export class ExternalFeedRoutingModule {}
