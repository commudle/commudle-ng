import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SpeakerResourceDiscussionMessageComponent } from './components/speaker-resource-discussion/speaker-resource-discussion-message/speaker-resource-discussion-message.component';
import { SpeakerResourceDiscussionComponent } from './components/speaker-resource-discussion/speaker-resource-discussion.component';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';
import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';


@NgModule({
  declarations: [
    SpeakerResourceComponent,
    SpeakerResourceDiscussionComponent,
    SpeakerResourceDiscussionMessageComponent

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
    NbInputModule
  ]
})
export class SpeakerResourcesModule {
}
