import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AuthService } from '@commudle/auth';
import { NgxDatatableModule } from '@commudle/ngx-datatable';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbTimepickerModule,
  NbToggleModule,
  NbTooltipModule,
  NbWindowModule,
} from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BackButtonComponent } from 'apps/shared-components/back-button/back-button.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SidebarComponent } from 'apps/shared-components/sidebar/sidebar.component';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { LinkyModule } from 'ngx-linky';
import { AppSharedComponentsModule } from '../../app-shared-components/app-shared-components.module';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { CollaboratingCommunitiesComponent } from './components/collaborating-communities/collaborating-communities.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventAgendaComponent } from './components/event-agenda/event-agenda.component';
import { EventCommentsComponent } from './components/event-comments/event-comments.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventEmbeddedVideoStreamComponent } from './components/event-embedded-video-stream/event-embedded-video-stream.component';
import { EventFormResponsesComponent } from './components/event-form-responses/event-form-responses.component';
import { UserDetailsCellComponent } from './components/event-form-responses/user-details-cell/user-details-cell.component';
import { UserEngagementDataComponent } from './components/event-form-responses/user-engagement-data/user-engagement-data.component';
import { EventLocationTracksComponent } from './components/event-locations/event-location-tracks/event-location-tracks.component';
import { TimeBlocksComponent } from './components/event-locations/event-location-tracks/time-blocks/time-blocks.component';
import { TrackSlotsComponent } from './components/event-locations/event-location-tracks/track-slots/track-slots.component';
import { EventLocationsComponent } from './components/event-locations/event-locations.component';
import { EventRecordingsComponent } from './components/event-recordings/event-recordings.component';
import { EventRegistrationsComponent } from './components/event-registrations/event-registrations.component';
import { EventSimpleRegistrationComponent } from './components/event-registrations/event-simple-registration/event-simple-registration.component';
import { FormGroupsComponent } from './components/event-registrations/form-groups/form-groups.component';
import { EventSpeakersComponent } from './components/event-speakers/event-speakers.component';
import { EventStatsComponent } from './components/event-stats/event-stats.component';
import { EventStatusComponent } from './components/event-status/event-status.component';
import { EventStreamingComponent } from './components/event-streaming/event-streaming.component';
import { EventUpdatesComponent } from './components/event-updates/event-updates.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { EntryPassScanComponent } from './components/user-event-registrations/entry-pass-scan/entry-pass-scan.component';
import { ExitPassScanComponent } from './components/user-event-registrations/exit-pass-scan/exit-pass-scan.component';
import { UserDetailsComponent } from './components/user-event-registrations/user-details/user-details.component';
import { UserEventRegistrationsComponent } from './components/user-event-registrations/user-event-registrations.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EventsRoutingModule } from './events-routing.module';
import { DiscountCouponsComponent } from './components/event-registrations/discount-coupons/discount-coupons.component';
import { PaymentSettingsComponent } from './components/event-registrations/form-groups/payment-settings/payment-settings.component';
import { DiscountCouponFormComponent } from './components/event-registrations/discount-coupons/discount-coupon-form/discount-coupon-form.component';
import { UserPaymentDetailsComponent } from './components/event-form-responses/user-payment-details/user-payment-details.component';
import { UserTrackSlotsComponent } from './components/event-form-responses/user-track-slots/user-track-slots.component';
import { TrackSlotFormComponent } from './components/event-locations/event-location-tracks/track-slot-form/track-slot-form.component';
import { EventFormResponsesGraphComponent } from './components/event-form-responses/event-form-responses-graph/event-form-responses-graph.component';
import { EditorModule as NewEditorModule } from '@commudle/editor';
import { NextStepCardComponent } from './components/next-step-card/next-step-card.component';
import { EventCheckedInListComponent } from './components/event-checked-in-list/event-checked-in-list.component';

@NgModule({
  declarations: [
    CreateEventComponent,
    EditEventComponent,
    CollaboratingCommunitiesComponent,
    VolunteersComponent,
    EventFormResponsesComponent,
    EventCommentsComponent,
    EventStatsComponent,
    EventDashboardComponent,
    FormGroupsComponent,
    UserDetailsCellComponent,
    EventLocationsComponent,
    EventLocationTracksComponent,
    EventUpdatesComponent,
    EventStatusComponent,
    EventSimpleRegistrationComponent,
    UserEventRegistrationsComponent,
    UserDetailsComponent,
    EventEmbeddedVideoStreamComponent,
    SponsorsComponent,
    EventSpeakersComponent,
    EventRecordingsComponent,
    EventDetailsComponent,
    EntryPassScanComponent,
    UserEngagementDataComponent,
    TimeBlocksComponent,
    TrackSlotsComponent,
    ExitPassScanComponent,
    EventAgendaComponent,
    EventRegistrationsComponent,
    EventStreamingComponent,
    DiscountCouponsComponent,
    PaymentSettingsComponent,
    DiscountCouponFormComponent,
    UserPaymentDetailsComponent,
    UserTrackSlotsComponent,
    TrackSlotFormComponent,
    EventFormResponsesGraphComponent,
    NextStepCardComponent,
    EventCheckedInListComponent,
  ],
  exports: [UserDetailsComponent, UserEngagementDataComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AppSharedComponentsModule,
    YouTubePlayerModule,
    ReusableComponentsModule,
    SharedDirectivesModule,
    MiniUserProfileModule,
    SharedComponentsModule,
    SharedPipesModule,
    // External
    FontAwesomeModule,
    NgxDatatableModule,
    LinkyModule,
    ZXingScannerModule,
    //standalone
    SidebarComponent,
    BackButtonComponent,
    //Nebular
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbAlertModule,
    NbListModule,
    NbTooltipModule,
    NbWindowModule.forChild(),
    NbIconModule,
    NbAutocompleteModule,
    NbToggleModule,
    NbPopoverModule,
    NbRadioModule,
    NbToggleModule,
    NbAccordionModule,
    NbTooltipModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbActionsModule,
    NbButtonGroupModule,
    NbIconModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbTagModule,
    NewEditorModule,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class EventsModule {}
