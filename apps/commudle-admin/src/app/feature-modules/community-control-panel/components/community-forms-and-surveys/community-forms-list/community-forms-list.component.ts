import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Cell, Settings } from 'angular2-smart-table';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { CommunityFormsListActionsComponent } from './community-forms-list-actions/community-forms-list-actions.component';
import { CommunityFormsListStatsComponent } from './community-forms-list-stats/community-forms-list-stats.component';

@Component({
  selector: 'app-community-forms-list',
  templateUrl: './community-forms-list.component.html',
  styleUrls: ['./community-forms-list.component.scss'],
})
export class CommunityFormsListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  newFormParentId;
  dataForms: IDataForm[];
  isLoading = true;
  tableSettings: Settings = {
    actions: false,
    pager: {
      perPage: 10,
    },
    columns: {
      name: {
        title: 'Name',
      },
      mini_stats: {
        title: 'Mini Stats',
        type: 'custom',
        renderComponent: CommunityFormsListStatsComponent,
        componentInitFunction: (instance: CommunityFormsListStatsComponent, cell: Cell) => {
          const dataForms: IDataForm = cell.getRow().getData();
          instance.rowData = dataForms;
        },
        isFilterable: false,
        isSortable: false,
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        renderComponent: CommunityFormsListActionsComponent,
        componentInitFunction: (instance: CommunityFormsListActionsComponent, cell: Cell) => {
          const dataForms: IDataForm = cell.getRow().getData();
          instance.rowData = dataForms;
        },
        isFilterable: false,
        isSortable: false,
      },
    },
  };

  constructor(private dataFormsService: DataFormsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.newFormParentId = this.activatedRoute.parent.parent.snapshot.params.community_id;
    if (this.newFormParentId) {
      this.getDataForms();
    }
  }

  getDataForms() {
    this.dataFormsService.getCommunityDataForms(this.newFormParentId).subscribe((data) => {
      this.dataForms = data.data_forms;
      this.isLoading = false;
    });
  }
}
