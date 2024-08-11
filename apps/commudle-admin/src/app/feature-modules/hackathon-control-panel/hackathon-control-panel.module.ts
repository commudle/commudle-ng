/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackathonControlPanelRoutes } from './hackathon-control-panel.routing';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SidebarComponent } from 'apps/shared-components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HackathonControlPanelBasicFormComponent } from './components/hackathon-control-panel-basic-form/hackathon-control-panel-basic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbRouteTabsetModule,
  NbSpinnerModule,
} from '@commudle/theme';
import { HackathonControlPanelContactDetailsFormComponent } from './components/hackathon-control-panel-contact-details-form/hackathon-control-panel-contact-details-form.component';
import { HackathonControlPanelDatesFormComponent } from './components/hackathon-control-panel-dates-form/hackathon-control-panel-dates-form.component';
import { HackathonControlPanelSponsorComponent } from './components/hackathon-control-panel-sponsor/hackathon-control-panel-sponsor.component';
import { HackathonControlPanelSponsorCardComponent } from './components/hackathon-control-panel-sponsor/hackathon-control-panel-sponsor-card/hackathon-control-panel-sponsor-card.component';
import { HackathonControlPanelTracksPrizesComponent } from './components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-tracks-prizes.component';
import { HackathonControlPanelTrackComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-track/hackathon-control-panel-track.component';
import { HackathonControlPanelPrizeComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-prize/hackathon-control-panel-prize.component';
import { HackathonTrackCardComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-track/hackathon-track-card/hackathon-track-card.component';
import { HackathonPrizeCardComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-prize/hackathon-prize-card/hackathon-prize-card.component';
import { HackathonControlPanelSpeakerJudgeComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-speaker-judge/hackathon-control-panel-speaker-judge.component';
import { HackathonNewFormComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-new-form/hackathon-new-form.component';
import { HackathonControlPanelFaqsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-faqs/hackathon-control-panel-faqs.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { HackathonJudgeCardComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-speaker-judge/hackathon-judge-card/hackathon-judge-card.component';
import { HackathonControlPanelRegistrationsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-registrations/hackathon-control-panel-registrations.component';
import { HackathonControlPanelUpdatesComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-updates/hackathon-control-panel-updates.component';
import { EditorModule as NewEditorModule } from '@commudle/editor';
import { HackathonControlPanelReviewComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-review/hackathon-control-panel-review.component';
import { HackathonControlPanelRoundsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-rounds/hackathon-control-panel-rounds.component';
import { HackathonControlPanelRoundCardComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-rounds/hackathon-control-panel-round-card/hackathon-control-panel-round-card.component';
import { HackathonControlPanelEmailsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-control-panel-emails.component';
import { HackathonWinnerAnnouncementEmailerComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-winner-announcement-emailer/hackathon-winner-announcement-emailer.component';
import { HackathonStatusFilterGeneralEmailsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-status-filter-general-emails/hackathon-status-filter-general-emails.component';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { HelpSectionComponent } from 'apps/commudle-admin/src/app/app-shared-components/help-section/help-section.component';

@NgModule({
  declarations: [
    HackathonControlPanelDashboardComponent,
    HackathonControlPanelBasicFormComponent,
    HackathonControlPanelContactDetailsFormComponent,
    HackathonControlPanelDatesFormComponent,
    HackathonControlPanelSponsorComponent,
    HackathonControlPanelSponsorCardComponent,
    HackathonControlPanelTracksPrizesComponent,
    HackathonControlPanelTrackComponent,
    HackathonControlPanelPrizeComponent,
    HackathonTrackCardComponent,
    HackathonPrizeCardComponent,
    HackathonControlPanelSpeakerJudgeComponent,
    HackathonNewFormComponent,
    HackathonControlPanelFaqsComponent,
    HackathonJudgeCardComponent,
    HackathonControlPanelRegistrationsComponent,
    HackathonControlPanelUpdatesComponent,
    HackathonControlPanelReviewComponent,
    HackathonControlPanelRoundsComponent,
    HackathonControlPanelRoundCardComponent,
    HackathonControlPanelEmailsComponent,
    HackathonWinnerAnnouncementEmailerComponent,
    HackathonStatusFilterGeneralEmailsComponent,
  ],
  imports: [
    CommonModule,
    HackathonControlPanelRoutes,
    SharedComponentsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AppSharedComponentsModule,
    NewEditorModule,
    SharedPipesModule,

    //components
    SidebarComponent,
    HelpSectionComponent,

    //nebular
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbCheckboxModule,
    NbButtonGroupModule,
    NbSpinnerModule,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class HackathonControlPanelModule {}
