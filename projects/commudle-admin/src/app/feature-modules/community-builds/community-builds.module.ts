import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
} from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { PageAdsModule } from 'projects/shared-modules/page-ads/page-ads.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { CommunityBuildsRoutingModule } from './community-builds-routing.module';
import { CommunityBuildDetailsComponent } from './components/community-build/community-build-details/community-build-details.component';
import { CommunityBuildComponent } from './components/community-build/community-build.component';
import { CommunityBuildCardComponent } from './components/community-builds/community-build-card/community-build-card.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CreateCommunityBuildComponent } from './components/create-community-build/create-community-build.component';
import { BuildListItemComponent } from './components/my-community-builds/build-list-item/build-list-item.component';
import { MyCommunityBuildsComponent } from './components/my-community-builds/my-community-builds.component';
import { TeammateInviteConfirmationComponent } from './components/teammate-invite-confirmation/teammate-invite-confirmation.component';

@NgModule({
  declarations: [
    CreateCommunityBuildComponent,
    MyCommunityBuildsComponent,
    CommunityBuildsComponent,
    CommunityBuildDetailsComponent,
    CommunityBuildComponent,
    BuildListItemComponent,
    TeammateInviteConfirmationComponent,
    CommunityBuildCardComponent,
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
    SharedDirectivesModule,

    // Nebular
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbPopoverModule,
    NbCheckboxModule,
    PageAdsModule,
  ],
})
export class CommunityBuildsModule {}
