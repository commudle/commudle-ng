import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmsVideoComponent } from './components/hms-video/hms-video.component';
import { LocalPreviewComponent } from './components/local-preview/local-preview.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NbButtonModule, NbCheckboxModule, NbInputModule, NbSelectModule, NbIconModule, NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserVideoComponent } from './components/conference/user-video/user-video.component';
import { ControlsComponent } from './components/conference/controls/controls.component';



@NgModule({
  declarations: [
    HmsVideoComponent,
    LocalPreviewComponent,
    ConferenceComponent,
    SettingsComponent,
    UserVideoComponent,
    ControlsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Nebular
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbIconModule,
    NbCardModule

  ],
  exports: [
    HmsVideoComponent
  ]
})
export class HmsVideoModule { }
