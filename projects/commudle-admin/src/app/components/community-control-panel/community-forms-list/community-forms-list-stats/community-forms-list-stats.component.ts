import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { IDataForm } from 'projects/shared-models/data_form.model';

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
