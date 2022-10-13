import { NbCardModule, NbIconModule, NbTabsetModule, NbRouteTabsetModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicCommunityGroupsRoutingModule } from './public-community-groups-routing.module';
import { CommunityGroupHomeComponent } from './components/community-group-home/community-group-home.component';
import { SharedComponentsModule } from '@commudle/shared-components';
import { CommunityGroupCommunitiesComponent } from './components/community-group-communities/community-group-communities.component';
import { CommunityGroupTeamComponent } from './components/community-group-team/community-group-team.component';
import { CommunityGroupAboutComponent } from './components/community-group-about/community-group-about.component';
import { SharedPipesModule } from '@commudle/shared-pipes';
import { SharedDirectivesModule } from '@commudle/shared-directives';

@NgModule({
  declarations: [
    CommunityGroupHomeComponent,
    CommunityGroupCommunitiesComponent,
    CommunityGroupTeamComponent,
    CommunityGroupAboutComponent,
  ],
  imports: [
    CommonModule,
    PublicCommunityGroupsRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,

    // Nebular
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbRouteTabsetModule,
  ],
})
export class PublicCommunityGroupsModule {}
