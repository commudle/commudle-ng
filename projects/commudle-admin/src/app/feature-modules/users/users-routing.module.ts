import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

import { UsersComponent } from './components/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: ':user_id',
        component: PublicProfileComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
