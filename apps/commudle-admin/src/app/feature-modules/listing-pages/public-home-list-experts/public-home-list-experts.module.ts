import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHomeListExpertsRoutingModule } from './public-home-list-experts-routing.module';
import { PublicHomeListExpertsComponent } from './components/public-home-list-experts/public-home-list-experts.component';
import { ListingPagesLayoutComponent } from 'apps/commudle-admin/src/app/app-shared-components/listing-pages-layout/listing-pages-layout.component';
import { ExpertsHeaderComponent } from './components/experts-header/experts-header.component';
import { NbButtonModule, NbIconModule } from '@commudle/theme';
import { PublicHomeListEventsModule } from '../public-home-list-events/public-home-list-events.module';
import { PublicHomeListSpeakersModule } from '../public-home-list-speakers/public-home-list-speakers.module';
import { ExpertsFeaturedComponent } from './components/experts-featured/experts-featured.component';
import { AppSharedComponentsModule } from '../../../app-shared-components/app-shared-components.module';
import { ExpertsComponent } from './components/experts/experts.component';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { ExpertsUsersComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-experts/components/experts-users/experts-users.component';

@NgModule({
  declarations: [
    PublicHomeListExpertsComponent,
    ExpertsHeaderComponent,
    ExpertsFeaturedComponent,
    ExpertsComponent,
    ExpertsUsersComponent,
  ],
  imports: [
    CommonModule,
    PublicHomeListExpertsRoutingModule,
    ListingPagesLayoutComponent,
    NbIconModule,
    NbButtonModule,
    PublicHomeListEventsModule,
    PublicHomeListSpeakersModule,
    AppSharedComponentsModule,
    SkeletonCardsComponent,
  ],
})
export class PublicHomeListExpertsModule {}
