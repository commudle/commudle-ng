import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbTooltipModule,
} from '@commudle/theme';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { SearchModule } from 'apps/commudle-admin/src/app/feature-modules/search/search.module';
import { SkeletonScreensModule } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/skeleton-screens.module';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { HomepageAboutComponent } from './components/homepage-about/homepage-about.component';
import { HomepageBuildsComponent } from './components/homepage-builds/homepage-builds.component';
import { HomepageEventsCardComponent } from './components/homepage-events/homepage-events-card/homepage-events-card.component';
import { HomepageEventsComponent } from './components/homepage-events/homepage-events.component';
import { HomepageExpertsComponent } from './components/homepage-experts/homepage-experts.component';
import { HomepageFeaturedCommunitiesComponent } from './components/homepage-featured-communities/homepage-featured-communities.component';
import { HomepageFeaturesComponent } from './components/homepage-features/homepage-features.component';
import { HomepageLabsComponent } from './components/homepage-labs/homepage-labs.component';
import { HomepageTestimonialsComponent } from './components/homepage-testimonials/homepage-testimonials.component';
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
    HomepageTestimonialsComponent,
    HomepageExpertsComponent,
    HomepageAboutComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    SkeletonScreensModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    PublicCommunityModule,
    SearchModule,
    MiniUserProfileModule,

    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbActionsModule,
    NbTooltipModule,
  ],
})
export class HomepageModule {}
