import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicHomeListSpeakersRoutingModule } from './public-home-list-speakers-routing.module';
import { PublicHomeListSpeakersComponent } from './components/public-home-list-speakers/public-home-list-speakers.component';
import { ListingPagesLayoutComponent } from 'apps/commudle-admin/src/app/app-shared-components/listing-pages-layout/listing-pages-layout.component';
import { SpeakersHeaderComponent } from './components/speakers-header/speakers-header.component';
import { EventMiniCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-mini-card/event-mini-card.component';
import { PublicHomeListSpeakersUpcomingComponent } from './components/public-home-list-speakers-upcoming/public-home-list-speakers-upcoming.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
} from '@commudle/theme';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { PublicHomeListEventsModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-events/public-home-list-events.module';
import { PublicHomeListSpeakersProfileComponent } from './components/public-home-list-speakers-profile/public-home-list-speakers-profile.component';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { PublicHomeListSpeakersContentComponent } from './components/public-home-list-speakers-content/public-home-list-speakers-content.component';
import { EventContentCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-content-card/event-content-card.component';
import { InfiniteScrollModule } from 'apps/shared-modules/infinite-scroll/infinite-scroll.module';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { SkeletonVerticalCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-vertical-cards/skeleton-vertical-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyStateComponent } from './components/empty-state-component/empty-state-component.component';

@NgModule({
  declarations: [
    PublicHomeListSpeakersComponent,
    SpeakersHeaderComponent,
    PublicHomeListSpeakersUpcomingComponent,
    PublicHomeListSpeakersProfileComponent,
    PublicHomeListSpeakersContentComponent,
    EmptyStateComponent,
  ],
  imports: [
    CommonModule,
    PublicHomeListSpeakersRoutingModule,
    ListingPagesLayoutComponent,
    EventMiniCardComponent,
    SkeletonCardsComponent,
    PublicHomeListEventsModule,
    PublicCommunityModule,
    InfiniteScrollModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    FormsModule,
    ReactiveFormsModule,

    //Standalone
    EventContentCardComponent,
    SkeletonVerticalCardsComponent,

    //Nebular
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
  ],
  exports: [PublicHomeListSpeakersContentComponent, EmptyStateComponent, PublicHomeListSpeakersUpcomingComponent],
})
export class PublicHomeListSpeakersModule {}
