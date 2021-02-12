import { NgModule } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  NbTooltipModule,
  NbDialogModule,
  NbAlertModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserVideoComponent } from './components/conference/user-video/user-video.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';
import { HmsClientManagerService } from './services/hms-client-manager.service';


@NgModule({
  declarations: [
    HmsVideoComponent,
    LocalPreviewComponent,
    ConferenceComponent,
    SettingsComponent,
    UserVideoComponent,
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
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbAlertModule


  ],
  exports: [
    HmsVideoComponent
  ],

  providers: [
    [
      {
        provide: 'HmsClientManagerService', useClass: HmsClientManagerService
      }
    ]
  ]
})
export class HmsVideoModule { }
