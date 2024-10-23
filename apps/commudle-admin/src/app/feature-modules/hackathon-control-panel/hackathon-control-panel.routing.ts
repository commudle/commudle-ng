/* eslint-disable @nx/enforce-module-boundaries */
import { Routes, RouterModule } from '@angular/router';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';
import { HackathonControlPanelBasicFormComponent } from './components/hackathon-control-panel-basic-form/hackathon-control-panel-basic-form.component';
import { HackathonControlPanelContactDetailsFormComponent } from './components/hackathon-control-panel-contact-details-form/hackathon-control-panel-contact-details-form.component';
import { HackathonControlPanelDatesFormComponent } from './components/hackathon-control-panel-dates-form/hackathon-control-panel-dates-form.component';
import { HackathonControlPanelSponsorComponent } from './components/hackathon-control-panel-sponsor/hackathon-control-panel-sponsor.component';
import { HackathonControlPanelTracksPrizesComponent } from './components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-tracks-prizes.component';
import { HackathonControlPanelTrackComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-track/hackathon-control-panel-track.component';
import { HackathonControlPanelPrizeComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-prize/hackathon-control-panel-prize.component';
import { HackathonControlPanelSpeakerJudgeComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-speaker-judge/hackathon-control-panel-speaker-judge.component';
import { HackathonNewFormComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-new-form/hackathon-new-form.component';
import { HackathonControlPanelFaqsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-faqs/hackathon-control-panel-faqs.component';
import { HackathonControlPanelRegistrationsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-registrations/hackathon-control-panel-registrations.component';
import { HackathonControlPanelUpdatesComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-updates/hackathon-control-panel-updates.component';
import { QuestionTypesResolver } from 'apps/shared-resolvers/question-types.resolver';
import { HackathonControlPanelReviewComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-review/hackathon-control-panel-review.component';
import { HackathonControlPanelRoundsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-rounds/hackathon-control-panel-rounds.component';
import { HackathonControlPanelEmailsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-control-panel-emails.component';
import { HackathonControlPanelChannelsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-channels/hackathon-control-panel-channels.component';

const routes: Routes = [
  {
    path: 'new',
    component: HackathonNewFormComponent,
  },
  {
    path: ':hackathon_id',
    children: [
      {
        path: '',
        component: HackathonControlPanelDashboardComponent,
        children: [
          {
            path: '',
            component: HackathonControlPanelBasicFormComponent,
          },
          {
            path: 'contact',
            component: HackathonControlPanelContactDetailsFormComponent,
          },
          {
            path: 'dates',
            component: HackathonControlPanelDatesFormComponent,
          },
          {
            path: 'sponsors',
            component: HackathonControlPanelSponsorComponent,
          },
          {
            path: 'tracks',
            component: HackathonControlPanelTracksPrizesComponent,
            children: [
              {
                path: '',
                component: HackathonControlPanelTrackComponent,
              },
              {
                path: 'prizes',
                component: HackathonControlPanelPrizeComponent,
              },
            ],
          },
          {
            path: 'speakers',
            component: HackathonControlPanelSpeakerJudgeComponent,
          },
          {
            path: 'faqs',
            component: HackathonControlPanelFaqsComponent,
          },
          {
            path: 'registrations',
            component: HackathonControlPanelRegistrationsComponent,
            resolve: {
              questionTypes: QuestionTypesResolver,
            },
          },
          {
            path: 'updates',
            component: HackathonControlPanelUpdatesComponent,
          },
          {
            path: 'review',
            component: HackathonControlPanelReviewComponent,
          },
          {
            path: 'rounds',
            component: HackathonControlPanelRoundsComponent,
          },
          {
            path: 'emails',
            component: HackathonControlPanelEmailsComponent,
          },
          {
            path: 'channels',
            component: HackathonControlPanelChannelsComponent,
          },
          {
            path: 'channels/:community_channel_id',
            component: HackathonControlPanelChannelsComponent,
          },
          {
            path: 'channels/join/:token',
            component: HackathonControlPanelChannelsComponent,
          },
          {
            path: 'channels/email-join/:email_token',
            component: HackathonControlPanelChannelsComponent,
          },
        ],
      },
    ],
  },
];

export const HackathonControlPanelRoutes = RouterModule.forChild(routes);
