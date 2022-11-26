import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailerComponent } from './emailer/emailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbRadioModule, NbSelectModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SpeakerResourcePreviewComponent } from './speaker-resource-preview/speaker-resource-preview.component';



@NgModule({
  declarations: [
    EmailerComponent,
    SpeakerResourcePreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,


    // Nebular
    NbRadioModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

  ],
  exports: [
    EmailerComponent,
    SpeakerResourcePreviewComponent
  ]
})
export class AppSharedComponentsModule { }
