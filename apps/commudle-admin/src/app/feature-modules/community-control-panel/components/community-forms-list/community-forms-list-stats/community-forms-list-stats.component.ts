import { Component, Input, OnInit } from '@angular/core';
import { IDataForm } from '@commudle/shared-models';
import { ViewCell } from 'angular2-smart-table';

@Component({
  selector: 'commudle-community-forms-list-stats',
  templateUrl: './community-forms-list-stats.component.html',
  styleUrls: ['./community-forms-list-stats.component.scss'],
})
export class CommunityFormsListStatsComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: IDataForm;

  ngOnInit() {}
}
