import { Component, Input, OnInit } from '@angular/core';
import { FormResponsesComponent } from '@commudle/shared-components';
import { IDataForm } from '@commudle/shared-models';
import { NbWindowService } from '@nebular/theme';
import { ViewCell } from 'angular2-smart-table';

@Component({
  selector: 'commudle-community-forms-list-actions',
  templateUrl: './community-forms-list-actions.component.html',
  styleUrls: ['./community-forms-list-actions.component.scss'],
})
export class CommunityFormsListActionsComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: IDataForm;

  constructor(private windowService: NbWindowService) {}

  ngOnInit() {}

  openResponses() {
    this.windowService.open(FormResponsesComponent, {
      title: `Survey ${this.rowData.name} Responses`,
      context: {
        dataFormId: this.rowData.id,
      },
      windowClass: 'full-screen-width',
    });
  }
}
