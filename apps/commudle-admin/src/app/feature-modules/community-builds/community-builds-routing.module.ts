import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@commudle/shared-services';
import { CommunityBuildComponent } from './components/community-build/community-build.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';
import { MyCommunityBuildsComponent } from './components/my-community-builds/my-community-builds.component';
import { TeammateInviteConfirmationComponent } from './components/teammate-invite-confirmation/teammate-invite-confirmation.component';

const routes = [
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
    component: MyCommunityBuildsComponent,
  },
  {
    path: 'teammate-invite/:community_build_id/:token',
    component: TeammateInviteConfirmationComponent,
  },
  {
    path: ':community_build_id/edit',
    canActivate: [AuthGuard],
    component: CreateCommunityBuildComponent,
  },
  {
    path: ':community_build_id',
    component: CommunityBuildComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityBuildsRoutingModule {}
