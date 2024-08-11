import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
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
} from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { LinkyModule } from 'ngx-linky';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { AboutComponent } from './components/about/about.component';
import { CommunityChannelsListComponent } from './components/community-channels-list/community-channels-list.component';
import { EventsComponent } from './components/events/events.component';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import { MembersComponent } from './components/members/members.component';
import { MembershipToggleComponent } from './components/membership-toggle/membership-toggle.component';
import { SpeakerCardComponent } from './components/speakers/speaker-card/speaker-card.component';
import { PublicCommunityRoutingModule } from './public-community-routing.module';
import { PublicCommunityNotificationsComponent } from './components/public-community-notifications/public-community-notifications.component';
import { NotificationsModule } from 'apps/commudle-admin/src/app/feature-modules/notifications/notifications.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { CommunityChannelsModule } from 'apps/commudle-admin/src/app/feature-modules/community-channels/community-channels.module';
import { SkeletonVerticalCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-vertical-cards/skeleton-vertical-cards.component';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { NewsletterComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/newsletters/newsletter/newsletter.component';
import { NewslettersComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/newsletters/newsletters.component';
import { BackButtonComponent } from 'apps/shared-components/back-button/back-button.component';
import { PublicCommunityHackathonsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/public-community-hackathons/public-community-hackathons.component';
import { EventHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-horizontal-card/event-horizontal-card.component';
import { SharedComponentsModule as newSharedComponentModule } from '@commudle/shared-components';
@NgModule({
  declarations: [
    HomeCommunityComponent,
    AboutComponent,
    EventsComponent,
    MembersComponent,
    // EventResourcesComponent,
    MembershipToggleComponent,
    CommunityChannelsListComponent,
    SpeakerCardComponent,
    PublicCommunityNotificationsComponent,
    CustomPageComponent,
    NewslettersComponent,
    NewsletterComponent,
    PublicCommunityHackathonsComponent,
  ],
  exports: [MembershipToggleComponent, SpeakerCardComponent],
  imports: [
    CommonModule,
    PublicCommunityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    LinkyModule,
    MiniUserProfileModule,
    NotificationsModule,
    SharedComponentsModule,
    FontAwesomeModule,
    UserConsentsComponent,
    CommunityChannelsModule,
    newSharedComponentModule,
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
    NbContextMenuModule,
    SkeletonVerticalCardsComponent,
    BackButtonComponent,
    EventHorizontalCardComponent,
  ],
})
export class PublicCommunityModule {}
