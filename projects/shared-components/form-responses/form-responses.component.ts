import { Component, OnInit, Input } from '@angular/core';
import { IDataFormEntity } from 'projects/shared-models/data_form_entity.model';
import { SDataFormEntitiesService } from '../services/s-data-form-entities.service';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { SDataFormsService } from '../services/s-data-forms.service';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.scss']
})
export class FormResponsesComponent implements OnInit {
  @Input() dataFormId: number;
  dataForm: IDataForm;
  dataFormEntities: IDataFormEntity[] = [];

  constructor(
    private sDataFormEntitiesService: SDataFormEntitiesService,
    private dataFormsService: SDataFormsService
  ) { }

  ngOnInit() {
    this.getDataFormEntities();
    this.getDataForm();
  }


  getDataFormEntities() {
    this.sDataFormEntitiesService.getDataFormEntities(this.dataFormId).subscribe(
      data => {
        this.dataFormEntities = data.data_form_entities;
      }
    );
  }

  getDataForm() {
        // get the dataform associated
    this.dataFormsService.getDataFormDetails(this.dataFormId).subscribe((data) => {
      this.dataForm = data;
    });
  }

}
