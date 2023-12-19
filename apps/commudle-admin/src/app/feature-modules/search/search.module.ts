import { CommonModule } from '@angular/common';
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
import { SearchDetailsComponent } from './components/search-details/search-details.component';
import { LabsFeaturedCardComponent } from '../../app-shared-components/labs-featured-card/labs-featured-card.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { PublicCommunityModule } from '../public-community/public-community.module';
import { FeaturedProjectsCardComponent } from '../../app-shared-components/featured-projects-card/featured-projects-card.component';
import { EventCardComponent } from '../../app-shared-components/event-card/event-card.component';
import { EventContentCardComponent } from '../../app-shared-components/event-content-card/event-content-card.component';
import { LinkyModule, LinkyPipe } from 'ngx-linky';

@NgModule({
  declarations: [SearchBoxComponent, SearchPageComponent, SearchDetailsComponent],
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
  ],
})
export class SearchModule {}
