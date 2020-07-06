import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityBuildsRoutingModule } from './community-builds-routing.module';
import { CommunityBuildsComponent } from './community-builds.component';


@NgModule({
  declarations: [CommunityBuildsComponent],
  imports: [
    CommonModule,
    CommunityBuildsRoutingModule
  ]
})
export class CommunityBuildsModule { }
