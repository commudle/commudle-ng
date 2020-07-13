import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';
import { MyCommunityBuildsComponent } from './components/my-community-builds/my-community-builds.component';
import { CommunityBuildDetailsComponent } from './components/community-build-details/community-build-details.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';


const routes: Routes = [
  {
    path: '',
    component: CommunityBuildsComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateCommunityBuildComponent,
  },
  {
    path: 'my-builds',
    canActivate: [AuthGuard],
    component: MyCommunityBuildsComponent
  },
  {
    path: ':community_build_id/edit',
    canActivate: [AuthGuard],
    component: CreateCommunityBuildComponent
  },
  {
    path: ':community_build_id',
    canActivate: [AuthGuard],
    component: CommunityBuildDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityBuildsRoutingModule { }
