import { Component, Input, OnInit } from '@angular/core';
import { IDataForm, IDataFormEntity } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { SDataFormEntitiesService } from '../services/s-data-form-entities.service';
import { SDataFormsService } from '../services/s-data-forms.service';

@Component({
  selector: 'commudle-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.scss'],
})
export class FormResponsesComponent implements OnInit {
  @Input() dataFormId: number;
  dataForm: IDataForm;
  dataFormEntities: IDataFormEntity[] = [];

  constructor(
    private sDataFormEntitiesService: SDataFormEntitiesService,
    private dataFormsService: SDataFormsService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit() {
    this.getDataFormEntities();
    this.getDataForm();
  }

  getDataFormEntities() {
    this.sDataFormEntitiesService.getDataFormEntities(this.dataFormId).subscribe((data) => {
      this.dataFormEntities = data.data_form_entities;
    });
  }

  getDataForm() {
    // get the dataform associated
    this.dataFormsService.getDataFormDetails(this.dataFormId).subscribe((data) => {
      this.dataForm = data;
    });
  }

  emailCSV(dfeId) {
    this.sDataFormEntitiesService.emailCSV(dfeId).subscribe((data) => {
      this.toastLogService.successDialog('CSV will be delivered to your inbox soon!', 3000);
    });
  }
}
