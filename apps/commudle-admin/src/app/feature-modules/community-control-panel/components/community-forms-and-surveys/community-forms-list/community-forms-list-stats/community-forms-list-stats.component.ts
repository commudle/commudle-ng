import { Component, Input, OnInit } from '@angular/core';
import { IDataForm } from 'apps/shared-models/data_form.model';

@Component({
  selector: 'app-community-forms-list-stats',
  templateUrl: './community-forms-list-stats.component.html',
  styleUrls: ['./community-forms-list-stats.component.scss'],
})
export class CommunityFormsListStatsComponent implements OnInit {
  @Input() value: string | number;
  @Input() rowData: IDataForm;

  ngOnInit() {}
}
