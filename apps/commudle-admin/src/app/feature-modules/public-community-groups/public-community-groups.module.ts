import {
  NbCardModule,
  NbIconModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbButtonModule,
  NbContextMenuModule,
} from '@commudle/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicCommunityGroupsRoutingModule } from './public-community-groups-routing.module';
import { CommunityGroupHomeComponent } from './components/community-group-home/community-group-home.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { CommunityGroupCommunitiesComponent } from './components/community-group-communities/community-group-communities.component';
import { CommunityGroupTeamComponent } from './components/community-group-team/community-group-team.component';
import { CommunityGroupAboutComponent } from './components/community-group-about/community-group-about.component';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { NbTagModule } from '@commudle/theme';
import { CommunityGroupActivityComponent } from './components/community-group-activity/community-group-activity.component';
import { CommunityGroupEventsComponent } from './components/community-group-events/community-group-events.component';
import { CommunityGroupChannelsComponent } from './components/community-group-channels/community-group-channels.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { CommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/communities-card/communities-card.component';
import { ChannelCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/channel-card/channel-card.component';
import { EventCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-card/event-card.component';
import { EventMediumCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-medium-card/event-medium-card.component';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { CommunityGroupCustomPageComponent } from './components/community-group-custom-page/community-group-custom-page.component';
import { PublicHomeListSpeakersModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/public-home-list-speakers.module';
import { PublicHomeListEventsModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-events/public-home-list-events.module';
import { FeaturedCommunityCardMediumComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-community-card-medium/featured-community-card-medium.component';
import { ForumCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/forum-card/forum-card.component';
import { CommunitiesChannelsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community-groups/components/community-group-channels/communities-channels/communities-channels.component';
import { OrgChannelsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community-groups/components/community-group-channels/org-channels/org-channels.component';
import { CommunityChannelsModule } from 'apps/commudle-admin/src/app/feature-modules/community-channels/community-channels.module';
import { InfiniteScrollModule } from 'apps/shared-modules/infinite-scroll/infinite-scroll.module';

@NgModule({
  declarations: [
    CommunityGroupHomeComponent,
    CommunityGroupCommunitiesComponent,
    CommunityGroupTeamComponent,
    CommunityGroupAboutComponent,
    CommunityGroupActivityComponent,
    CommunityGroupEventsComponent,
    CommunityGroupChannelsComponent,
    CommunityGroupCustomPageComponent,
    CommunitiesChannelsComponent,
    OrgChannelsComponent,
  ],
  imports: [
    CommonModule,
    PublicCommunityGroupsRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    FontAwesomeModule,
    PublicCommunityModule,
    CommunityChannelsModule,
    InfiniteScrollModule,
    //standalone component
    CommunitiesCardComponent,
    ChannelCardComponent,
    ForumCardComponent,
    EventCardComponent,
    EventMediumCardComponent,
    SkeletonCardsComponent,
    // Nebular
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbTagModule,
    NbButtonModule,
    NbContextMenuModule,
    PublicHomeListSpeakersModule,
    PublicHomeListEventsModule,
    FeaturedCommunityCardMediumComponent,
  ],
})
export class PublicCommunityGroupsModule {}
