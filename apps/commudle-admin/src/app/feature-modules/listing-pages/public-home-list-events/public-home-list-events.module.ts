import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbButtonModule, NbIconModule } from '@commudle/theme';
import { PublicHomeListEventsRoutingModule } from './public-home-list-events-routing.module';
import { PublicHomeListEventsComponent } from './components/public-home-list-events/public-home-list-events.component';
import { PublicHomeListEventsHeaderComponent } from './components/public-home-list-events-header/public-home-list-events-header.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { PublicHomeListEventsUpcomingComponent } from './components/public-home-list-events-upcoming/public-home-list-events-upcoming/public-home-list-events-upcoming.component';
import { PublicHomeListEventsFeaturedCommunitiesComponent } from './components/public-home-list-events-featured-communities/public-home-list-events-featured-communities.component';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicHomeListEventsPastComponent } from './components/public-home-list-events-past/public-home-list-events-past.component';
import { PublicHomeListEventsSpeakersComponent } from './components/public-home-list-events-speakers/public-home-list-events-speakers.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { EventCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-card/event-card.component';
import { PublicHomeListEventsTechSessionsComponent } from './components/public-home-list-events-tech-sessions/public-home-list-events-tech-sessions.component';
import { FeaturedCommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-communities-card/featured-communities-card.component';
import { TechSessionsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/tech-sessions-card/tech-sessions-card.component';
import { EventsUpcomingCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/events-upcoming-card/events-upcoming-card.component';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
@NgModule({
  declarations: [
    PublicHomeListEventsComponent,
    PublicHomeListEventsHeaderComponent,
    PublicHomeListEventsUpcomingComponent,
    PublicHomeListEventsFeaturedCommunitiesComponent,
    PublicHomeListEventsPastComponent,
    PublicHomeListEventsSpeakersComponent,
    PublicHomeListEventsTechSessionsComponent,
  ],
  imports: [
    CommonModule,
    PublicHomeListEventsRoutingModule,
    NbCardModule,
    NbButtonModule,
    SharedComponentsModule,
    SharedPipesModule,
    NbIconModule,
    FontAwesomeModule,
    MiniUserProfileModule,
    EventCardComponent,
    FeaturedCommunitiesCardComponent,
    TechSessionsCardComponent,
    EventsUpcomingCardComponent,
    SharedDirectivesModule,
  ],
})
export class PublicHomeListEventsModule {}
