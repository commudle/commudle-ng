import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailerComponent } from './emailer/emailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbRadioModule, NbSelectModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    EmailerComponent
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
    EmailerComponent
  ]
})
export class AppSharedComponentsModule { }
