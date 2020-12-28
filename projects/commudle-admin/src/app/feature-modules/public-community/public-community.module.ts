import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicCommunityRoutingModule } from './public-community-routing.module';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import {
  NbCardModule,
  NbListModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbPopoverModule,
  NbTabsetModule,
  NbAlertModule,
  NbBadgeModule, NbSelectModule, NbOptionModule, NbDialogModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { AboutComponent } from './components/about/about.component';
import { EventsComponent } from './components/events/events.component';
import { MembersComponent } from './components/members/members.component';
import { EventResourcesComponent } from './components/event-resources/event-resources.component';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { MembershipToggleComponent } from './components/membership-toggle/membership-toggle.component';
import { CommunityChannelsListComponent } from './components/community-channels-list/community-channels-list.component';


@NgModule({
  declarations: [
    HomeCommunityComponent,
    AboutComponent,
    EventsComponent,
    MembersComponent,
    EventResourcesComponent,
    MembershipToggleComponent,
    CommunityChannelsListComponent
  ],
  imports: [
    CommonModule,
    PublicCommunityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedPipesModule,





    // Nebular
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbPopoverModule,
    NbTabsetModule,
    NbAlertModule,
    NbBadgeModule,
    NbSelectModule,
    NbOptionModule,
    NbDialogModule.forChild()
  ]
})
export class PublicCommunityModule { }
