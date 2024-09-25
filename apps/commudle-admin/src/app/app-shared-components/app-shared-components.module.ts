import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailerComponent } from './emailer/emailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbToggleModule,
} from '@commudle/theme';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SpeakerResourcePreviewComponent } from './speaker-resource-preview/speaker-resource-preview.component';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { FeaturedCommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-communities-card/featured-communities-card.component';
import { TechSessionsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/tech-sessions-card/tech-sessions-card.component';
import { EventHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-horizontal-card/event-horizontal-card.component';
import { TopBuildersCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/top-builders-card/top-builders-card.component';
import { LabsFeaturedCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/labs-featured-card/labs-featured-card.component';
import { LabsFeaturedComponent } from 'apps/commudle-admin/src/app/app-shared-components/labs-featured/labs-featured.component';
import { SurveysComponent } from 'apps/commudle-admin/src/app/app-shared-components/surveys/surveys.component';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { CustomPageFormComponent } from 'apps/commudle-admin/src/app/app-shared-components/custom-page/custom-page-form/custom-page-form.component';
import { NewsletterComponent } from 'apps/commudle-admin/src/app/app-shared-components/newsletter/newsletter.component';
import { NewsletterFormComponent } from 'apps/commudle-admin/src/app/app-shared-components/newsletter/newsletter-form/newsletter-form.component';
import { PublicPageLayoutComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-page-layout/public-page-layout.component';
import { TestimonialCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/testimonial-card/testimonial-card.component';
import { PublicPageStatsComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-page-stats/public-page-stats.component';
import { PublicPageCtaComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-page-cta/public-page-cta.component';
import { PublicPageFeatureCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-page-feature-card/public-page-feature-card.component';
import { PublicPageSignupNewsletterComponent } from 'apps/commudle-admin/src/app/app-shared-components/public-page-signup-newsletter/public-page-signup-newsletter.component';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { FeaturedExpertsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-experts-card/featured-experts-card.component';
import { AdminHackathonComponent } from './admin-hackathon/admin-hackathon.component';
import { WhatsNewComponent } from 'apps/commudle-admin/src/app/app-shared-components/whats-new/whats-new.component';
import { HelpDictionaryIframeComponent } from './help-dictionary-iframe/help-dictionary-iframe.component';
import { HelpSectionComponent } from 'apps/commudle-admin/src/app/app-shared-components/help-section/help-section.component';
import { UpcomingHackathonsComponent } from './upcoming-hackathons/upcoming-hackathons.component';
import { EventMiniCardComponent } from './event-mini-card/event-mini-card.component';
import { SpeakerSlidesCardComponent } from './speaker-slides-card/speaker-slides-card.component';
import { CallForSpeakerCardComponent } from './call-for-speaker-card/call-for-speaker-card.component';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { EventHackathonRegistrationsComponent } from './event-hackathon-registrations/event-hackathon-registrations.component';

@NgModule({
  declarations: [
    EmailerComponent,
    SpeakerResourcePreviewComponent,
    SurveysComponent,
    LabsFeaturedComponent,
    CustomPageComponent,
    CustomPageFormComponent,
    NewsletterComponent,
    NewsletterFormComponent,
    PublicPageLayoutComponent,
    TestimonialCardComponent,
    PublicPageStatsComponent,
    PublicPageCtaComponent,
    PublicPageFeatureCardComponent,
    PublicPageSignupNewsletterComponent,
    AdminHackathonComponent,
    HelpDictionaryIframeComponent,
    UpcomingHackathonsComponent,
    SpeakerSlidesCardComponent,
    CallForSpeakerCardComponent,
    EventHackathonRegistrationsComponent,
  ],
  exports: [
    EmailerComponent,
    SpeakerResourcePreviewComponent,
    SurveysComponent,
    LabsFeaturedComponent,
    CustomPageComponent,
    NewsletterComponent,
    NewsletterFormComponent,
    PublicPageLayoutComponent,
    TestimonialCardComponent,
    PublicPageStatsComponent,
    PublicPageCtaComponent,
    PublicPageFeatureCardComponent,
    PublicPageSignupNewsletterComponent,
    FeaturedExpertsCardComponent,
    AdminHackathonComponent,
    CustomPageFormComponent,
    WhatsNewComponent,
    HelpDictionaryIframeComponent,
    UpcomingHackathonsComponent,
    SpeakerSlidesCardComponent,
    CallForSpeakerCardComponent,
    EventHackathonRegistrationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule,
    PublicCommunityModule,
    SharedComponentsModule,
    MiniUserProfileModule,
    SharedDirectivesModule,
    //Standalone
    TechSessionsCardComponent,
    EventHorizontalCardComponent,
    FeaturedCommunitiesCardComponent,
    TopBuildersCardComponent,
    LabsFeaturedCardComponent,
    SkeletonCardsComponent,
    FeaturedExpertsCardComponent,
    WhatsNewComponent,
    HelpSectionComponent,

    // Nebular
    NbRadioModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbToggleModule,
    NbIconModule,
    NbCardModule,
    NbToggleModule,
    NbIconModule,
    NbCardModule,
    //FontAwesome
    FontAwesomeModule,
    SharedPipesModule,
    EventMiniCardComponent,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class AppSharedComponentsModule {}
