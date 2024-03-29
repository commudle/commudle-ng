import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRound } from '@commudle/shared-models';
import * as moment from 'moment';

@Component({
  selector: 'commudle-hackathon-control-panel-round-card',
  templateUrl: './hackathon-control-panel-round-card.component.html',
  styleUrls: ['./hackathon-control-panel-round-card.component.scss'],
})
export class HackathonControlPanelRoundCardComponent implements OnInit {
  @Input() round: IRound;
  @Output() destroyRoundEvent: EventEmitter<IRound> = new EventEmitter();
  @Output() editRoundEvent: EventEmitter<IRound> = new EventEmitter();
  moment = moment;
  constructor() {}

  ngOnInit() {}

  editRound(roundId) {
    this.editRoundEvent.emit(roundId);
  }

  destroyRound(round) {
    this.destroyRoundEvent.emit(round);
  }
}
