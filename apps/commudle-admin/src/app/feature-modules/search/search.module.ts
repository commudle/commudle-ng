import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
  NbTagModule,
  NbUserModule,
} from '@commudle/theme';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { PublicHomeListSpeakersModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/public-home-list-speakers.module';
import { PublicHomeListEventsModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-events/public-home-list-events.module';
import { SearchDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/search/components/search-details/search-details.component';
import { LabsFeaturedCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/labs-featured-card/labs-featured-card.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { FeaturedProjectsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-projects-card/featured-projects-card.component';
import { EventCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-card/event-card.component';
import { EventContentCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-content-card/event-content-card.component';
import { LinkyModule } from 'ngx-linky';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { LocationHeaderComponent } from 'apps/commudle-admin/src/app/feature-modules/search/components/location-header/location-header.component';
import { EventHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-horizontal-card/event-horizontal-card.component';
import { TechSessionsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/tech-sessions-card/tech-sessions-card.component';

@NgModule({
  declarations: [SearchBoxComponent, SearchPageComponent, SearchDetailsComponent, LocationHeaderComponent],
  exports: [SearchBoxComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    NbInputModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NbListModule,
    NbTagModule,
    SharedDirectivesModule,
    SharedComponentsModule,
    PublicHomeListSpeakersModule,
    PublicHomeListEventsModule,
    LabsFeaturedCardComponent,
    MiniUserProfileModule,
    PublicCommunityModule,
    FeaturedProjectsCardComponent,
    EventCardComponent,
    EventContentCardComponent,
    LinkyModule,
    SkeletonCardsComponent,
    EventHorizontalCardComponent,
    TechSessionsCardComponent,
  ],
  providers: [TitleCasePipe],
})
export class SearchModule {}
