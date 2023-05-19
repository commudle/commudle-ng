import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { PublicHomeListEventsRoutingModule } from './public-home-list-events-routing.module';
import { PublicHomeListEventsComponent } from './components/public-home-list-events/public-home-list-events.component';
import { PublicHomeListEventsHeaderComponent } from './components/public-home-list-events-header/public-home-list-events-header.component';
import { PublicHomeListEventsUpcomingComponent } from './components/public-home-list-events-upcoming/public-home-list-events-upcoming.component';

@NgModule({
  declarations: [
    PublicHomeListEventsComponent,
    PublicHomeListEventsHeaderComponent,
    PublicHomeListEventsUpcomingComponent,
  ],
  imports: [CommonModule, PublicHomeListEventsRoutingModule, NbCardModule],
})
export class PublicHomeListEventsModule {}
