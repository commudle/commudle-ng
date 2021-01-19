import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmsVideoComponent } from './components/hms-video/hms-video.component';
import { LocalPreviewComponent } from './components/local-preview/local-preview.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NbButtonModule, NbCheckboxModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HmsVideoComponent,
    LocalPreviewComponent,
    ConferenceComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Nebular
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule

  ],
  exports: [
    HmsVideoComponent
  ]
})
export class HmsVideoModule { }
