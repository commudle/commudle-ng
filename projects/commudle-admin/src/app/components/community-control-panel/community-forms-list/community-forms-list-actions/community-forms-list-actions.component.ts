import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { IDataForm } from 'projects/shared-models/data_form.model';

@Component({
  selector: 'app-community-forms-list-actions',
  templateUrl: './community-forms-list-actions.component.html',
  styleUrls: ['./community-forms-list-actions.component.scss']
})
export class CommunityFormsListActionsComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: IDataForm;

  ngOnInit() {
  }

}
