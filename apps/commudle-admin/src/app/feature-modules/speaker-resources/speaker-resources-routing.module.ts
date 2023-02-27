import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';

const routes = [{ path: ':speaker_resource_id', component: SpeakerResourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakerResourcesRoutingModule {}
