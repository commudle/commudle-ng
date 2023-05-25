import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbButtonModule, NbIconModule } from '@commudle/theme';
import { PublicHomeListEventsRoutingModule } from './public-home-list-events-routing.module';
import { PublicHomeListEventsComponent } from './components/public-home-list-events/public-home-list-events.component';
import { PublicHomeListEventsHeaderComponent } from './components/public-home-list-events-header/public-home-list-events-header.component';
import { SharedComponentsModule } from '../../../../../../shared-components/shared-components.module';
import { PublicHomeListEventsUpcomingComponent } from './components/public-home-list-events-upcoming/public-home-list-events-upcoming/public-home-list-events-upcoming.component';
import { PublicHomeListEventsUpcomingListComponent } from './components/public-home-list-events-upcoming-list/public-home-list-events-upcoming-list.component';
import { PublicHomeListEventsFeaturedCommunitiesComponent } from './components/public-home-list-events-featured-communities/public-home-list-events-featured-communities.component';
import { PublicHomeListEventsFeaturedCommunitiesCardComponent } from './components/public-home-list-events-featured-communities-card/public-home-list-events-featured-communities-card.component';
import { SharedPipesModule } from '../../../../../../shared-pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicHomeListEventsPastComponent } from './components/public-home-list-events-past/public-home-list-events-past.component';
import { PublicHomeListEventsPastCardComponent } from './components/public-home-list-events-past-card/public-home-list-events-past-card.component';
@NgModule({
  declarations: [
    PublicHomeListEventsComponent,
    PublicHomeListEventsHeaderComponent,
    PublicHomeListEventsUpcomingComponent,
    PublicHomeListEventsUpcomingListComponent,
    PublicHomeListEventsFeaturedCommunitiesComponent,
    PublicHomeListEventsFeaturedCommunitiesCardComponent,
    PublicHomeListEventsPastComponent,
    PublicHomeListEventsPastCardComponent,
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
  ],
})
export class PublicHomeListEventsModule {}
