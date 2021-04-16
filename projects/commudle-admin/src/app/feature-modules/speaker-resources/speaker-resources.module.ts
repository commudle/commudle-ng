import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { NbCardModule,NbLayoutModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';
import {NbThemeModule , NbInputModule, NbButtonModule,NbTabsetModule,NbActionsModule,NbButtonGroupModule,NbIconModule, NbFormFieldModule,} from "@nebular/theme";
// import { SpeakerResourceCommentsComponent } from './components/speaker-resource-comments/speaker-resource-comments.component';


@NgModule({
  declarations: [
    SpeakerResourceComponent,
    // SpeakerResourceCommentsComponent,
  ],
  imports: [
    CommonModule,
    SpeakerResourcesRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbFormFieldModule
  ]
})
export class SpeakerResourcesModule { }
