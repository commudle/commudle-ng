import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbUserModule,
} from '@nebular/theme';
import { LinkyModule } from 'ngx-linky';
import { SharedComponentsModule } from '@commudle/shared-components';
import { MiniUserProfileModule, SharedModulesModule } from "@commudle/shared-modules";
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';
import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';

@NgModule({
  declarations: [SpeakerResourceComponent],
  imports: [
    CommonModule,
    SpeakerResourcesRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedModulesModule,
    LinkyModule,

    // Nebular
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,
    MiniUserProfileModule,
  ],
})
export class SpeakerResourcesModule {}
