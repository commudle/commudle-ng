import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityBuildsComponent } from './community-builds.component';

const routes: Routes = [{ path: '', component: CommunityBuildsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityBuildsRoutingModule { }
