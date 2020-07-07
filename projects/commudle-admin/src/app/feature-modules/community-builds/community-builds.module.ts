import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityBuildsRoutingModule } from './community-builds-routing.module';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';
import { NbCardModule, NbSelectModule, NbInputModule, NbButtonModule, NbIconModule, NbPopoverModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    CreateCommunityBuildComponent
  ],
  imports: [
    CommonModule,
    CommunityBuildsRoutingModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    SharedComponentsModule,
    EditorModule,



    // nebular
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbPopoverModule,

  ]
})
export class CommunityBuildsModule { }
