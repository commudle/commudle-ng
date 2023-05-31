import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailerComponent } from './emailer/emailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbRadioModule, NbSelectModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SpeakerResourcePreviewComponent } from './speaker-resource-preview/speaker-resource-preview.component';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { UserConsentsComponent } from './user-consents/user-consents.component';
import { PublicHomeListEventsFeaturedCommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-home-list-events-featured-communities-card/public-home-list-events-featured-communities-card.component';
import { PublicHomeListEventsTechSessionsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-home-list-events-tech-sessions-card/public-home-list-events-tech-sessions-card.component';
import { MembershipToggleComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/membership-toggle/membership-toggle.component';
import { EventsUpcomingCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/events-upcoming-card/events-upcoming-card.component';

@NgModule({
  declarations: [EmailerComponent, SpeakerResourcePreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule,
    PublicCommunityModule,
    PublicHomeListEventsFeaturedCommunitiesCardComponent,
    PublicHomeListEventsTechSessionsCardComponent,
    EventsUpcomingCardComponent,

    // Nebular
    NbRadioModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
  ],
  exports: [EmailerComponent, SpeakerResourcePreviewComponent],
})
export class AppSharedComponentsModule {}
