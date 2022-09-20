import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '@commudle/shared-components';
import { SharedDirectivesModule } from '@commudle/shared-directives';
import { MiniUserProfileModule, SharedModulesModule } from "@commudle/shared-modules";
import { SharedPipesModule } from '@commudle/shared-pipes';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbTooltipModule,
} from '@nebular/theme';
import { PublicCommunityModule } from '../public-community/public-community.module';
import { SearchModule } from '../search/search.module';
import { SkeletonScreensModule } from '../skeleton-screens/skeleton-screens.module';
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
    SharedModulesModule,

    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbActionsModule,
    NbTooltipModule,
    MiniUserProfileModule,
  ],
})
export class HomepageModule {}
