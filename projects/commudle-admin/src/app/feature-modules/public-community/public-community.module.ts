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
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
} from '@nebular/theme';
import { LinkyModule } from 'ngx-linky';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
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
    SharedPipesModule,
    SharedDirectivesModule,
    LinkyModule,
    MiniUserProfileModule,

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
    NbSpinnerModule,
  ],
})
export class PublicCommunityModule {}
