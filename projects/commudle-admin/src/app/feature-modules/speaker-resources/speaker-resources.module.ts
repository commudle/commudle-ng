import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerResourcesRoutingModule } from './speaker-resources-routing.module';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';


@NgModule({
  declarations: [
    SpeakerResourceComponent
  ],
  imports: [
    CommonModule,
    SpeakerResourcesRoutingModule
  ]
})
export class SpeakerResourcesModule { }
