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
} from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [EditDataFormComponent, CreateDataFormComponent],
  imports: [
    CommonModule,
    DataFormsRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,

    // External
    FontAwesomeModule,

    // Nebula
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbIconModule,

    //cdk module
    DragDropModule,
  ],
})
export class DataFormsModule {}
