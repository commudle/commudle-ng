import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRound } from '@commudle/shared-models';
import * as moment from 'moment';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-hackathon-control-panel-round-card',
  templateUrl: './hackathon-control-panel-round-card.component.html',
  styleUrls: ['./hackathon-control-panel-round-card.component.scss'],
})
export class HackathonControlPanelRoundCardComponent implements OnInit {
  @Input() round: IRound;
  @Input() communitySlug: string;
  @Input() hackathonSlug: string;
  @Output() destroyRoundEvent: EventEmitter<IRound> = new EventEmitter();
  @Output() editRoundEvent: EventEmitter<IRound> = new EventEmitter();
  @Output() createChannelForRound: EventEmitter<IRound> = new EventEmitter();
  moment = moment;

  icons = {
    faHashtag,
  };
  constructor() {}

  ngOnInit() {}

  editRound(roundId) {
    this.editRoundEvent.emit(roundId);
  }

  destroyRound(round) {
    this.destroyRoundEvent.emit(round);
  }

  createChannel() {
    this.createChannelForRound.emit(this.round);
  }
}
