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
} from '@commudle/theme';
import { LinkyModule } from 'ngx-linky';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';
import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';

@NgModule({
  declarations: [SpeakerResourceComponent],
  imports: [
    CommonModule,
    SpeakerResourcesRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MiniUserProfileModule,
    LinkyModule,

    // Nebular
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,
  ],
})
export class SpeakerResourcesModule {}
