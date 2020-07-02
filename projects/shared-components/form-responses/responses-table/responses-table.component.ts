import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { IQuestion } from 'projects/shared-models/question.model';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { ActivatedRoute } from '@angular/router';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SDataFormEntityResponseGroupsService } from 'projects/shared-components/services/s-data-form-entity-response-groups.service';

@Component({
  selector: 'app-responses-table',
  templateUrl: './responses-table.component.html',
  styleUrls: ['./responses-table.component.scss']
})
export class ResponsesTableComponent implements OnInit {

  @ViewChild('table') table;

  @Input() dataFormEntityId: number;
  @Input() dataForm: IDataForm;
  questions: IQuestion[] = [];

  isLoading = true;
  rows = [];
  ColumnMode = ColumnMode;
  SortType = SortType;
  emptyMessage;

  page = 1;
  totalEntries: number;
  count = 25;
  filterValue = '';
  registrationStatusId = 0;


  searchForm = this.fb.group({
    name: ['']
  });

  constructor(
    private sDataFormEntityResponseGroupsService: SDataFormEntityResponseGroupsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.questions = this.dataForm.questions;

    // this.getResponses();
    this.updateFilter();
  }


  updateFilter() {
    this.searchForm.valueChanges.pipe(
      debounceTime(800),
      switchMap(() => {
        this.page = 1;
        this.emptyMessage = 'Loading...';
        return this.sDataFormEntityResponseGroupsService.dataFormEntityResponses(
          this.dataFormEntityId,
          this.searchForm.get('name').value.toLowerCase(),
          this.page,
          this.count
          );
      })
    ).subscribe((data) => {
      this.setResponses(data);
    });
  }


  setPage(pageNumber) {
    this.page = pageNumber + 1;
    this.getResponses();
  }

  getResponses() {
    this.emptyMessage = 'Loading...';
    this.isLoading = false;
    this.rows = [];
    this.sDataFormEntityResponseGroupsService.dataFormEntityResponses(
      this.dataFormEntityId,
      this.searchForm.get('name').value.toLowerCase(),
      this.page,
      this.count
      ).subscribe(
      (data) => {
        this.totalEntries = data.total;
        this.rows = data.data_form_entity_response_groups;
        console.log(this.rows);
        this.isLoading = false;
        this.emptyMessage = 'No data to display';
      }
    );
  }

  setResponses(data) {
    this.totalEntries = data.total;
    this.rows = data.data_form_entity_response_groups;
    this.isLoading = false;
    this.emptyMessage = 'No entries found';
  }


  getQuestionResponse(userResponses, questionId) {
    const userQuestionResponses = userResponses.filter(k => k.question_id === questionId);
    let responses = '';
    for (let resp of userQuestionResponses) {
      responses += `${resp.response_text} \n`;
    }

    return (userQuestionResponses.length === 0 ? '..' : responses);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }

}
