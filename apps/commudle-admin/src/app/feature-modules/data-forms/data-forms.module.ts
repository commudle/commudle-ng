import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@commudle/shared-components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';
import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';
import { DataFormsRoutingModule } from './data-forms-routing.module';

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
  ],
})
export class DataFormsModule {}
