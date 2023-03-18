import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailerComponent } from './emailer/emailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbRadioModule, NbSelectModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SpeakerResourcePreviewComponent } from './speaker-resource-preview/speaker-resource-preview.component';
import { CommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/communities-list-card/communities-list-card.component';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';

@NgModule({
  declarations: [EmailerComponent, SpeakerResourcePreviewComponent, CommunitiesCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule,
    PublicCommunityModule,

    // Nebular
    NbRadioModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
  ],
  exports: [EmailerComponent, SpeakerResourcePreviewComponent, CommunitiesCardComponent],
})
export class AppSharedComponentsModule {}
