import { Component, Input, OnInit } from '@angular/core';
import { EQuestionTypes, IDataForm, IPoll } from '@commudle/shared-models';
import { RandomColorsService } from '@commudle/shared-services';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { SDataFormsService } from '../services/s-data-forms.service';
import { SPollsService } from '../services/s-polls.service';

@Component({
  selector: 'commudle-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss'],
})
export class PollResultComponent implements OnInit {
  @Input() pollId;

  EQuestionTypes = EQuestionTypes;

  poll: IPoll;
  dataForm: IDataForm;

  pollResultValues = {};
  charts = {};

  constructor(
    private pollsService: SPollsService,
    private dataFormsService: SDataFormsService,
    private randomColors: RandomColorsService,
  ) {}

  ngOnInit() {
    this.getPoll();
  }

  getPoll() {
    this.pollsService.pGetPoll(this.pollId).subscribe((data) => {
      this.poll = data;
      this.getDataForm();
    });
  }

  getDataForm() {
    this.dataFormsService.getDataFormDetails(this.poll.data_form_entity.data_form_id).subscribe((data) => {
      this.dataForm = data;
      this.getResults();
    });
  }

  getResults() {
    this.dataForm.questions.forEach((question) => {
      this.pollsService.pQuestionResponses(this.pollId, question.id).subscribe((data) => {
        if (![EQuestionTypes.LONG_ANSWER, EQuestionTypes.SHORT_ANSWER].includes(question.question_type_id)) {
          this.charts[`${question.id}`] = this.createChart(question.id, data.responses);
        }
        this.pollResultValues[`${question.id}`] = data.responses;
      });
    });
  }

  createChart(questionId, responses) {
    const values = _.countBy(responses);
    return new Chart(`chart-${questionId}`, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: Object.values(values),
            backgroundColor: this.randomColors.generateArray(Object.keys(values).length),
          },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Object.keys(values),
      },
      options: {
        responsive: true,
      },
    });
  }
}
