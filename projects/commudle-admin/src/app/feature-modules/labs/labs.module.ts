import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './components/labs/labs.component';
import { CreateLabComponent } from './components/create-lab/create-lab.component';
import { EditLabComponent } from './components/edit-lab/edit-lab.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbButtonComponent } from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    LabsComponent,
    CreateLabComponent,
    EditLabComponent
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    ReactiveFormsModule,
    EditorModule,


    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule

  ]
})
export class LabsModule { }
