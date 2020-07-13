import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityBuildsRoutingModule } from './community-builds-routing.module';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';
import { NbCardModule, NbSelectModule, NbInputModule, NbButtonModule, NbIconModule, NbPopoverModule, NbCheckboxModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MyCommunityBuildsComponent } from './components/my-community-builds/my-community-builds.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CommunityBuildDetailsComponent } from './components/community-build-details/community-build-details.component';
import { CommunityBuildHListItemComponent } from './community-build-h-list-item/community-build-h-list-item.component';


@NgModule({
  declarations: [
    CreateCommunityBuildComponent,
    MyCommunityBuildsComponent,
    CommunityBuildsComponent,
    CommunityBuildDetailsComponent,
    CommunityBuildHListItemComponent
  ],
  imports: [
    CommonModule,
    CommunityBuildsRoutingModule,
    FormsModule,
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
    NbCheckboxModule
  ]
})
export class CommunityBuildsModule { }
