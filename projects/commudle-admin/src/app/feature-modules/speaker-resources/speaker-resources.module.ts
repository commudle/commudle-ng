import { NbCardModule,NbLayoutModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';
import {NbThemeModule , NbInputModule, NbButtonModule,NbTabsetModule,NbActionsModule,NbButtonGroupModule,NbIconModule, NbFormFieldModule,} from "@nebular/theme";


@NgModule({
  declarations: [
    SpeakerResourceComponent
  ],
  imports: [
    CommonModule,
    SpeakerResourcesRoutingModule,
    NbCardModule,
    NbLayoutModule
  ]
})
export class SpeakerResourcesModule { }
