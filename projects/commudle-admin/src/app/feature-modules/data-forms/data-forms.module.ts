import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';
import { DataFormsRoutingModule } from './data-forms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbCardModule, NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    EditDataFormComponent,
    CreateDataFormComponent
  ],
  imports: [
    CommonModule,
    DataFormsRoutingModule,
    ReactiveFormsModule,


    // External
    FontAwesomeModule,



    // Nebula
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,

  ]
})
export class DataFormsModule { }
