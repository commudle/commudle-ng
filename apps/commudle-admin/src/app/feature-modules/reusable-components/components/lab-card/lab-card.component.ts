import { Component, OnInit, Input } from '@angular/core';
import { ILab } from '@commudle/shared-models';
import * as moment from 'moment';

@Component({
  selector: 'commudle-lab-card',
  templateUrl: './lab-card.component.html',
  styleUrls: ['./lab-card.component.scss']
})
export class LabCardComponent implements OnInit {
  moment = moment;

  @Input() lab: ILab;

  constructor() { }

  ngOnInit() {

  }

}
