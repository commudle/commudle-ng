import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';

const routes: Routes = [
    {
      path: '',
      component: ExternalFeedComponent,
    }
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ExternalFeedRoutingModule { }
  