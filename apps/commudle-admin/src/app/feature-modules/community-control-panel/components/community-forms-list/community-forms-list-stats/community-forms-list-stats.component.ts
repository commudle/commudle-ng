import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'angular2-smart-table';
import { IDataForm } from 'apps/shared-models/data_form.model';

@Component({
  selector: 'app-community-forms-list-stats',
  templateUrl: './community-forms-list-stats.component.html',
  styleUrls: ['./community-forms-list-stats.component.scss']
})
export class CommunityFormsListStatsComponent implements ViewCell, OnInit {


  @Input() value: string | number;
  @Input() rowData: IDataForm;

  ngOnInit() {
  }


}
