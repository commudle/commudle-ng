import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmsVideoComponent } from './components/hms-video/hms-video.component';
import { LocalPreviewComponent } from './components/local-preview/local-preview.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SettingsComponent } from './components/conference/settings/settings.component';
import {
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbCardModule,
  NbSpinnerModule,
  NbTooltipModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserVideoComponent } from './components/conference/user-video/user-video.component';
import { ControlsComponent } from './components/conference/controls/controls.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';



@NgModule({
  declarations: [
    HmsVideoComponent,
    LocalPreviewComponent,
    ConferenceComponent,
    SettingsComponent,
    UserVideoComponent,
    ControlsComponent,
    SelectRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,

    // Nebular
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbIconModule,
    NbCardModule,
    NbSpinnerModule,
    NbTooltipModule

  ],
  exports: [
    HmsVideoComponent
  ]
})
export class HmsVideoModule { }
