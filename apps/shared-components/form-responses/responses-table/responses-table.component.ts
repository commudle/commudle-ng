import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColumnMode, SortType } from '@commudle/ngx-datatable';
import { SDataFormEntityResponseGroupsService } from 'apps/shared-components/services/s-data-form-entity-response-groups.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IQuestion } from 'apps/shared-models/question.model';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-responses-table',
  templateUrl: './responses-table.component.html',
  styleUrls: ['./responses-table.component.scss'],
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

  searchForm;

  constructor(
    private sDataFormEntityResponseGroupsService: SDataFormEntityResponseGroupsService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.questions = this.dataForm.questions;

    // this.getResponses();
    this.updateFilter();
  }

  updateFilter() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(() => {
          this.page = 1;
          this.emptyMessage = 'Loading...';
          return this.sDataFormEntityResponseGroupsService.dataFormEntityResponses(
            this.dataFormEntityId,
            this.searchForm.get('name').value.toLowerCase(),
            this.page,
            this.count,
          );
        }),
      )
      .subscribe((data) => {
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
    this.sDataFormEntityResponseGroupsService
      .dataFormEntityResponses(
        this.dataFormEntityId,
        this.searchForm.get('name').value.toLowerCase(),
        this.page,
        this.count,
      )
      .subscribe((data) => {
        this.totalEntries = data.total;
        this.rows = data.data_form_entity_response_groups;
        this.isLoading = false;
        this.emptyMessage = 'No data to display';
      });
  }

  setResponses(data) {
    this.totalEntries = data.total;
    this.rows = data.data_form_entity_response_groups;
    this.isLoading = false;
    this.emptyMessage = 'No entries found';
  }

  getQuestionResponse(userResponses, questionId) {
    const userQuestionResponses = userResponses.filter((k) => k.question_id === questionId);
    let responses = '';
    for (let resp of userQuestionResponses) {
      responses += `${resp.response_text} \n`;
    }

    return userQuestionResponses.length === 0 ? '..' : responses;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}
}
