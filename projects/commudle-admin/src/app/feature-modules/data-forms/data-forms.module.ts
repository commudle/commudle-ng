import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';
import { DataFormsRoutingModule } from './data-forms-routing.module';



@NgModule({
  declarations: [EditDataFormComponent, CreateDataFormComponent],
  imports: [
    CommonModule,
    DataFormsRoutingModule
  ]
})
export class DataFormsModule { }
