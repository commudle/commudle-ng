import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from "@commudle/shared-components";
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
import { SharedDirectivesModule } from '@commudle/shared-directives';
import { MiniUserProfileModule, SharedModulesModule } from "@commudle/shared-modules";
import { SharedPipesModule } from '@commudle/shared-pipes';
import { AboutComponent } from './components/about/about.component';
import { CommunityChannelsListComponent } from './components/community-channels-list/community-channels-list.component';
import { EventsComponent } from './components/events/events.component';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import { MembersComponent } from './components/members/members.component';
import { MembershipToggleComponent } from './components/membership-toggle/membership-toggle.component';
import { SpeakerCardComponent } from './components/speakers/speaker-card/speaker-card.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { PublicCommunityRoutingModule } from './public-community-routing.module';
import { PublicCommunityNotificationsComponent } from './components/public-community-notifications/public-community-notifications.component';
import { NotificationsModule } from 'apps/commudle-admin/src/app/feature-modules/notifications/notifications.module';

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
    PublicCommunityNotificationsComponent,
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
    SharedModulesModule,

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
    NotificationsModule,
    MiniUserProfileModule,
    SharedComponentsModule,
  ],
})
export class PublicCommunityModule {}
