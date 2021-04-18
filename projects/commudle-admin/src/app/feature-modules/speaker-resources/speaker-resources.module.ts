import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbLayoutModule, NbUserModule} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';
import { NbInputModule, NbButtonModule,NbIconModule, NbFormFieldModule,} from "@nebular/theme";
import { SpeakerResourceDiscussionComponent } from './components/speaker-resource/speaker-resource-discussion/speaker-resource-discussion.component';
import { SpeakerResourceDiscussionMessageComponent } from './components/speaker-resource/speaker-resource-discussion/speaker-resource-discussion-message/speaker-resource-discussion-message.component';


@NgModule({
  declarations: [
    SpeakerResourceComponent,
    SpeakerResourceDiscussionComponent,
    SpeakerResourceDiscussionMessageComponent,

  ],
  imports: [
    CommonModule,
    SpeakerResourcesRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,



    // Nebular
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,

  ]
})
export class SpeakerResourcesModule { }
