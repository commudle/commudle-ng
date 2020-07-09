import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateCommunityBuildComponent
  },
  {
    path: 'edit/:community_build_id',
    component: CreateCommunityBuildComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityBuildsRoutingModule { }
