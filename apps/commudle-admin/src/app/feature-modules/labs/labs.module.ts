import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbUserModule,
} from '@commudle/theme';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { LinkyModule } from 'ngx-linky';
import { RecommendationsModule } from 'apps/commudle-admin/src/app/feature-modules/recommendations/recommendations.module';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { InfiniteScrollModule } from 'apps/shared-modules/infinite-scroll/infinite-scroll.module';
import { MentionModule } from 'apps/shared-modules/mention/mention.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { CreateLabComponent } from './components/create-lab/create-lab.component';
import { EditLabComponent } from './components/edit-lab/edit-lab.component';
import { LabDetailsComponent } from './components/lab/lab-details/lab-details.component';
import { LabDiscussionMessageComponent } from './components/lab/lab-discussion/lab-discussion-message/lab-discussion-message.component';
import { LabDiscussionComponent } from './components/lab/lab-discussion/lab-discussion.component';
import { LabStepComponent } from './components/lab/lab-step/lab-step.component';
import { LabComponent } from './components/lab/lab.component';
import { LabsCardComponent } from './components/labs/labs-card/labs-card.component';
import { LabsHeaderComponent } from './components/labs/labs-header/labs-header.component';
import { LabsSearchComponent } from './components/labs/labs-search/labs-search.component';
import { LabsComponent } from './components/labs/labs.component';
import { LabListItemComponent } from './components/my-labs/lab-list-item/lab-list-item.component';
import { MyLabsComponent } from './components/my-labs/my-labs.component';
import { LabsRoutingModule } from './labs-routing.module';
import { ListingPagesLayoutComponent } from 'apps/commudle-admin/src/app/app-shared-components/listing-pages-layout/listing-pages-layout.component';
import { SkeletonVerticalCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-vertical-cards/skeleton-vertical-cards.component';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { PublicHomeListSpeakersModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/public-home-list-speakers.module';
import { CommunityBuildsModule } from 'apps/commudle-admin/src/app/feature-modules/community-builds/community-builds.module';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { HelpSectionComponent } from 'apps/commudle-admin/src/app/app-shared-components/help-section/help-section.component';

@NgModule({
  declarations: [
    LabsComponent,
    CreateLabComponent,
    EditLabComponent,
    MyLabsComponent,
    LabComponent,
    LabStepComponent,
    LabListItemComponent,
    LabDiscussionComponent,
    LabDiscussionMessageComponent,
    LabDetailsComponent,
    LabsHeaderComponent,
    LabsSearchComponent,
    LabsCardComponent,
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    FontAwesomeModule,
    SharedComponentsModule,
    ReusableComponentsModule,
    YouTubePlayerModule,
    SharedPipesModule,
    NbSpinnerModule,
    LinkyModule,
    SharedDirectivesModule,
    MentionModule,
    InfiniteScrollModule,
    RecommendationsModule,
    MiniUserProfileModule,
    PublicHomeListSpeakersModule,
    CommunityBuildsModule,
    PublicHomeListSpeakersModule,
    AppSharedComponentsModule,
    HelpSectionComponent,

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbFormFieldModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbUserModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
    ListingPagesLayoutComponent,
    SkeletonVerticalCardsComponent,
    SkeletonCardsComponent,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class LabsModule {}
