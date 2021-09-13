import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { ConferenceSettingsComponent } from './components/conference-v2/conference-settings/conference-settings.component';
import { ConferenceUserVideoComponent } from './components/conference-v2/conference-user-videos/conference-user-video/conference-user-video.component';
import { ConferenceUserVideosComponent } from './components/conference-v2/conference-user-videos/conference-user-videos.component';
import { ConferenceV2Component } from './components/conference-v2/conference-v2.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SettingsComponent } from './components/conference/settings/settings.component';
import { UserVideoComponent } from './components/conference/user-video/user-video.component';
import { HmsBeamComponent } from './components/hms-beam/hms-beam.component';
import { HmsVideoV2Component } from './components/hms-video-v2/hms-video-v2.component';
import { HmsVideoComponent } from './components/hms-video/hms-video.component';
import { LocalPreviewV2Component } from './components/local-preview-v2/local-preview-v2.component';
import { LocalPreviewComponent } from './components/local-preview/local-preview.component';
import { SelectRoleV2Component } from './components/select-role-v2/select-role-v2.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { HmsClientManagerService } from './services/hms-client-manager.service';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';

@NgModule({
  declarations: [
    HmsVideoComponent,
    LocalPreviewComponent,
    ConferenceComponent,
    SettingsComponent,
    UserVideoComponent,
    SelectRoleComponent,
    ConferenceV2Component,
    HmsVideoV2Component,
    SelectRoleV2Component,
    LocalPreviewV2Component,
    ConferenceUserVideosComponent,
    ConferenceSettingsComponent,
    HmsBeamComponent,
    ConferenceUserVideoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    SharedDirectivesModule,

    // Nebular
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbIconModule,
    NbCardModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbAlertModule,
  ],
  exports: [HmsVideoComponent, HmsVideoV2Component],
  // TODO: Should this be removed?
  providers: [
    [
      {
        provide: 'HmsClientManagerService',
        useClass: HmsClientManagerService,
      },
    ],
  ],
})
export class HmsVideoModule {}
