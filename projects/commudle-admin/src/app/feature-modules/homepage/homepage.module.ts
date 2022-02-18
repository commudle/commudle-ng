import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { SearchModule } from 'projects/commudle-admin/src/app/feature-modules/search/search.module';
import { SkeletonScreensModule } from 'projects/commudle-admin/src/app/feature-modules/skeleton-screens/skeleton-screens.module';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { HomepageBuildsComponent } from './components/homepage-builds/homepage-builds.component';
import { HomepageEventsCardComponent } from './components/homepage-events/homepage-events-card/homepage-events-card.component';
import { HomepageEventsComponent } from './components/homepage-events/homepage-events.component';
import { HomepageFeaturedCommunitiesComponent } from './components/homepage-featured-communities/homepage-featured-communities.component';
import { HomepageFeaturesComponent } from './components/homepage-features/homepage-features.component';
import { HomepageLabsComponent } from './components/homepage-labs/homepage-labs.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [
    HomepageComponent,
    HomepageEventsComponent,
    HomepageEventsCardComponent,
    HomepageBuildsComponent,
    HomepageLabsComponent,
    HomepageFeaturesComponent,
    HomepageFeaturedCommunitiesComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    SkeletonScreensModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SearchModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
  ],
})
export class HomepageModule {}
