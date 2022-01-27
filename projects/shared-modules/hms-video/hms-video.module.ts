import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { HmsBeamComponent } from './components/hms-beam/hms-beam.component';
import { ConferenceSettingsComponent } from './components/hms-video/conference/conference-settings/conference-settings.component';
import { ConferenceUserVideoComponent } from './components/hms-video/conference/conference-user-videos/conference-user-video/conference-user-video.component';
import { ConferenceUserVideosComponent } from './components/hms-video/conference/conference-user-videos/conference-user-videos.component';
import { ConferenceComponent } from './components/hms-video/conference/conference.component';
import { HmsVideoComponent } from './components/hms-video/hms-video.component';
import { LocalPreviewComponent } from './components/hms-video/local-preview/local-preview.component';
import { SelectRoleComponent } from './components/hms-video/select-role/select-role.component';

@NgModule({
  declarations: [
    HmsVideoComponent,
    HmsBeamComponent,
    ConferenceComponent,
    ConferenceSettingsComponent,
    ConferenceUserVideosComponent,
    ConferenceUserVideoComponent,
    LocalPreviewComponent,
    SelectRoleComponent,
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
    RouterModule,
  ],
  exports: [HmsVideoComponent],
})
export class HmsVideoModule {}
