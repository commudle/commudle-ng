import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCommunityComponent } from './components/home-community/home-community.component';


const routes: Routes = [
  {
    path: '',
    component: HomeCommunityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicCommunityRoutingModule { }
