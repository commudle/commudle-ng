import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpHomeComponent } from './components/help-home/help-home.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

const routes: Routes = [
  {
    path: '',
    component: HelpHomeComponent,
    children: [
      {
        path: 'events',
        children: [
          {
            path: 'create',
            component: CreateEventComponent
          }
        ]
      }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
