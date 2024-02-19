import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';
import { DataFormsRoutingModule } from './data-forms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbCheckboxModule,
  NbIconModule,
  NbToggleModule,
  NbContextMenuModule,
  NbFormFieldModule,
} from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { EditorModule as tinyMCEEditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  declarations: [EditDataFormComponent, CreateDataFormComponent],
  imports: [
    CommonModule,
    DataFormsRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NbToggleModule,
    SharedPipesModule,
    NbFormFieldModule,

    // External
    FontAwesomeModule,

    // Nebula
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbIconModule,
    NbContextMenuModule,

    //cdk module
    DragDropModule,

    tinyMCEEditorModule,
  ],
})
export class DataFormsModule {}
