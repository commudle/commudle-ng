import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';
import { MyCommunityBuildsComponent } from './components/my-community-builds/my-community-builds.component';
import { CommunityBuildDetailsComponent } from './components/community-build-details/community-build-details.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateCommunityBuildComponent
  },
  {
    path: 'my-builds',
    component: MyCommunityBuildsComponent
  },
  {
    path: ':community_build_id/edit',
    component: CreateCommunityBuildComponent
  },
  {
    path: ':community_build_id',
    component: CommunityBuildDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityBuildsRoutingModule { }
