import { Component, OnInit } from '@angular/core';
import { DataFormsService } from '../../../services/data_forms.service';
import { ActivatedRoute } from '@angular/router';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { CommunityFormsListStatsComponent } from './community-forms-list-stats/community-forms-list-stats.component';
import { CommunityFormsListActionsComponent } from './community-forms-list-actions/community-forms-list-actions.component';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-community-forms-list',
  templateUrl: './community-forms-list.component.html',
  styleUrls: ['./community-forms-list.component.scss']
})
export class CommunityFormsListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  newFormParentId;
  dataForms: IDataForm[];
  tableSettings = {
    actions: false,
    columns: {
      name: {
        title: 'Name'
      },
      mini_stats: {
        title: 'Mini Stats',
        filter: false,
        type: 'custom',
        renderComponent: CommunityFormsListStatsComponent,
        sort: false
      },
      actions: {
        title: 'Actions',
        filter: false,
        sort: false,
        type: 'custom',
        renderComponent: CommunityFormsListActionsComponent,
      }
    },
  };


  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.newFormParentId = this.activatedRoute.snapshot.params['name'];
      this.getDataForms();
    });
  }


  getDataForms() {
    this.dataFormsService.getCommunityDataForms(this.newFormParentId).subscribe((data) => {
      this.dataForms = data.data_forms;
    });
  }



}
