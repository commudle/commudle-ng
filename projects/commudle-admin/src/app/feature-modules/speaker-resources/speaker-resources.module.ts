import {SharedComponentsModule} from 'projects/shared-components/shared-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbUserModule} from '@nebular/theme';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeakerResourcesRoutingModule} from './speaker-resources-routing.module';
import {SpeakerResourceComponent} from './components/speaker-resource/speaker-resource.component';
import {SpeakerResourceDiscussionComponent} from './components/speaker-resource-discussion/speaker-resource-discussion.component';
import {SpeakerResourceDiscussionMessageComponent} from './components/speaker-resource-discussion/speaker-resource-discussion-message/speaker-resource-discussion-message.component';
import {UsersModule} from 'projects/commudle-admin/src/app/feature-modules/users/users.module';


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
    UsersModule,

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
export class SpeakerResourcesModule {
}
