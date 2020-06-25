import { Component, OnInit, Input } from '@angular/core';
import { SPollsService } from 'projects/shared-components/services/s-polls.service';
import { IPoll } from 'projects/shared-models/poll.model';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { SDataFormsService } from 'projects/shared-components/services/s-data-forms.service';
import { EQuestionTypes } from 'projects/shared-models/enums/question_types.enum';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { RandomColorsService } from 'projects/shared-services/random-colors.service';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss']
})
export class PollResultComponent implements OnInit {
  EQuestionTypes = EQuestionTypes;
  @Input() pollId;

  poll: IPoll;
  dataForm: IDataForm;
  pollResultValues = {};
  charts = {};

  constructor(
    private pollsService: SPollsService,
    private dataFormsService: SDataFormsService,
    private randomColors: RandomColorsService
  ) { }

  ngOnInit() {
    this.getPoll();
  }

  getPoll() {
    this.pollsService.pGetPoll(this.pollId).subscribe(
      data => {
        this.poll = data;
        this.getDataForm();
      }
    );
  }

  getDataForm() {
    this.dataFormsService.getDataFormDetails(this.poll.data_form_entity.data_form_id).subscribe(
      data => {
        this.dataForm = data;
        this.getResults();
      }
    );
  }

  getResults() {
    for (let question of this.dataForm.questions) {
      this.pollsService.pQuestionResponses(this.pollId, question.id).subscribe(
        data => {
          this.charts[`${question.id}`] = this.createChart(question.id, data.responses);
          this.pollResultValues[`${question.id}`] = data.responses;
        }
      );
    }
  }

  createChart(questionId, responses) {
    const values = _.countBy(responses);
    return new Chart(`chart-${questionId}`,  {
      type: 'pie',
      data: {
        datasets: [{
            data: Object.values(values),
            backgroundColor: this.randomColors.generateArray(Object.keys(values).length)
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Object.keys(values)
      },
      options: {
        responsive: true
      }
    });
  }

}
