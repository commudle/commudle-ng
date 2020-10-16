import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { FormResponsesComponent } from 'projects/shared-components/form-responses/form-responses.component';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'app-community-forms-list-actions',
  templateUrl: './community-forms-list-actions.component.html',
  styleUrls: ['./community-forms-list-actions.component.scss']
})
export class CommunityFormsListActionsComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: IDataForm;

  constructor(    private windowService: NbWindowService) {

  }

  ngOnInit() {
  }

  openResponses() {
    this.windowService.open(
      FormResponsesComponent,
      {
        title: `Survey ${this.rowData.name} Responses`,
        context: {
          dataFormId: this.rowData.id
        },
        windowClass: 'full-screen-width'
      }
    );
  }

}
