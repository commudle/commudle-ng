import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbOptionModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { AboutComponent } from './components/about/about.component';
import { CommunityChannelsListComponent } from './components/community-channels-list/community-channels-list.component';
import { EventsComponent } from './components/events/events.component';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import { MembersComponent } from './components/members/members.component';
import { MembershipToggleComponent } from './components/membership-toggle/membership-toggle.component';
import { SpeakerCardComponent } from './components/speakers/speaker-card/speaker-card.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { PublicCommunityRoutingModule } from './public-community-routing.module';

@NgModule({
  declarations: [
    HomeCommunityComponent,
    AboutComponent,
    EventsComponent,
    MembersComponent,
    // EventResourcesComponent,
    MembershipToggleComponent,
    CommunityChannelsListComponent,
    SpeakersComponent,
    SpeakerCardComponent,
  ],
  exports: [MembershipToggleComponent],
  imports: [
    CommonModule,
    PublicCommunityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,

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
    NbDialogModule.forChild(),
  ],
})
export class PublicCommunityModule {}
