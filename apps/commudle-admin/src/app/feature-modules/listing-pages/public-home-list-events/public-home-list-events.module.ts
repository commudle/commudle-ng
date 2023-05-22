import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbButtonModule } from '@commudle/theme';
import { PublicHomeListEventsRoutingModule } from './public-home-list-events-routing.module';
import { PublicHomeListEventsComponent } from './components/public-home-list-events/public-home-list-events.component';
import { PublicHomeListEventsHeaderComponent } from './components/public-home-list-events-header/public-home-list-events-header.component';
import { SharedComponentsModule } from '../../../../../../shared-components/shared-components.module';
import { PublicHomeListEventsUpcomingComponent } from './components/public-home-list-events-upcoming/public-home-list-events-upcoming/public-home-list-events-upcoming.component';
import { PublicHomeListEventsUpcomingListComponent } from './components/public-home-list-events-upcoming-list/public-home-list-events-upcoming-list.component';

@NgModule({
  declarations: [
    PublicHomeListEventsComponent,
    PublicHomeListEventsHeaderComponent,
    PublicHomeListEventsUpcomingComponent,
    PublicHomeListEventsUpcomingListComponent,
  ],
  imports: [CommonModule, PublicHomeListEventsRoutingModule, NbCardModule, NbButtonModule, SharedComponentsModule],
})
export class PublicHomeListEventsModule {}
