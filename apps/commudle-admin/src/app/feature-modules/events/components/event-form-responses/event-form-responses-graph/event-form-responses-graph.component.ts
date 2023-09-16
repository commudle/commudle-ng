import { Component, Input, OnInit } from '@angular/core';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EQuestionTypes } from 'apps/shared-models/enums/question_types.enum';
import { IQuestion } from 'apps/shared-models/question.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'commudle-event-form-responses-graph',
  templateUrl: './event-form-responses-graph.component.html',
  styleUrls: ['./event-form-responses-graph.component.scss'],
})
export class EventFormResponsesGraphComponent implements OnInit {
  isLoading = true;
  @Input() forms;
  @Input() eventDataFormEntityGroupId;
  @Input() filterValue;
  @Input() registrationStatusId;
  @Input() page;
  @Input() count;
  @Input() gender;
  @Input() selectedEventLocationTrackId;
  @Input() question: IQuestion;
  EQuestionTypes = EQuestionTypes;
  responses;
  constructor(private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService) {}

  ngOnInit(): void {
    this.getResponses();
  }

  getResponses() {
    const formData = new FormData();
    this.isLoading = false;
    if (this.forms.length > 0) {
      for (const form of this.forms) {
        formData.append(`qres[]q`, form.get('q').value);
        formData.append(`qres[]v`, form.get('v').value);
      }
    }
    this.dataFormEntityResponseGroupsService
      .getEventDataFormResponsesByFilter(
        this.eventDataFormEntityGroupId,
        this.filterValue,
        this.registrationStatusId,
        this.page,
        this.count,
        this.question.id,
        this.gender,
        this.selectedEventLocationTrackId,
        formData,
      )
      .subscribe((data) => {
        this.responses = data.responses;
        const divesityChat = new Chart(`diversity`, {
          type: 'pie',
          data: {
            datasets: [
              {
                data: [
                  data.diversity.male,
                  data.diversity.female,
                  data.diversity.prefer_not_to_answer,
                  data.diversity.NA,
                ],
                backgroundColor: ['blue', '#ff43bc', 'purple', 'green'],
              },
            ],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['Male', 'Female', 'Prefer Not To Answer', 'NA'],
          },
          options: {
            responsive: true,
          },
        });

        if (
          this.question.question_type_id === EQuestionTypes.MULTIPLE_CHOICE ||
          this.question.question_type_id === EQuestionTypes.SINGLE_CHOICE
        ) {
          const responseChart = new Chart(`responses`, {
            type: 'pie',
            data: {
              datasets: [
                {
                  data: this.responses.map((row) => row),
                  backgroundColor: ['blue', '#ff43bc', 'purple', 'green'],
                },
              ],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: this.responses.map((row) => row),
            },
            options: {
              responsive: true,
            },
          });
        }
      });
  }
}
