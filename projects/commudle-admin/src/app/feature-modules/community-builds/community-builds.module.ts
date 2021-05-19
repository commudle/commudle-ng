import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommunityBuildsRoutingModule} from './community-builds-routing.module';
import {CreateCommunityBuildComponent} from './components/create-community-build/create-community-build.component';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {SharedComponentsModule} from 'projects/shared-components/shared-components.module';
import {EditorModule} from '@tinymce/tinymce-angular';
import {MyCommunityBuildsComponent} from './components/my-community-builds/my-community-builds.component';
import {CommunityBuildsComponent} from './components/community-builds/community-builds.component';
import {CommunityBuildDetailsComponent} from './components/community-build/community-build-details/community-build-details.component';
import {CommunityBuildHListItemComponent} from './components/community-build-h-list-item/community-build-h-list-item.component';
import {CommunityBuildComponent} from './components/community-build/community-build.component';
import {BuildListItemComponent} from './components/my-community-builds/build-list-item/build-list-item.component';
import {TeammateInviteConfirmationComponent} from './components/teammate-invite-confirmation/teammate-invite-confirmation.component';
import {SharedPipesModule} from 'projects/shared-pipes/pipes.module';
import {UsersModule} from 'projects/commudle-admin/src/app/feature-modules/users/users.module';

@NgModule({
  declarations: [
    CreateCommunityBuildComponent,
    MyCommunityBuildsComponent,
    CommunityBuildsComponent,
    CommunityBuildDetailsComponent,
    CommunityBuildHListItemComponent,
    CommunityBuildComponent,
    BuildListItemComponent,
    TeammateInviteConfirmationComponent,
  ],
  imports: [
    CommonModule,
    CommunityBuildsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    SharedComponentsModule,
    EditorModule,
    SharedPipesModule,


    // nebular
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbPopoverModule,
    NbCheckboxModule,
    UsersModule
  ]
})
export class CommunityBuildsModule { }
