import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailerComponent } from './emailer/emailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbRadioModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbToggleModule,
  NbIconModule,
} from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SpeakerResourcePreviewComponent } from './speaker-resource-preview/speaker-resource-preview.component';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { FeaturedCommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-communities-card/featured-communities-card.component';
import { TechSessionsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/tech-sessions-card/tech-sessions-card.component';
import { EventHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-horizontal-card/event-horizontal-card.component';
import { TopBuildersCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/top-builders-card/top-builders-card.component';
import { SurveysComponent } from './surveys/surveys.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';

@NgModule({
  declarations: [EmailerComponent, SpeakerResourcePreviewComponent, SurveysComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule,
    PublicCommunityModule,
    SharedComponentsModule,

    //Standalone
    TechSessionsCardComponent,
    EventHorizontalCardComponent,
    FeaturedCommunitiesCardComponent,
    TopBuildersCardComponent,

    // Nebular
    NbRadioModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbToggleModule,
    NbIconModule,
  ],
  exports: [EmailerComponent, SpeakerResourcePreviewComponent, SurveysComponent],
})
export class AppSharedComponentsModule {}
