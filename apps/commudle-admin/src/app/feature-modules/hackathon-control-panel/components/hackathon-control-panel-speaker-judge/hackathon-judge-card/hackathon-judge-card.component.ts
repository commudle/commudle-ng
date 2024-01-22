import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHackathonJudge } from 'apps/shared-models/hackathon-judge.model';

@Component({
  selector: 'commudle-hackathon-judge-card',
  templateUrl: './hackathon-judge-card.component.html',
  styleUrls: ['./hackathon-judge-card.component.scss'],
})
export class HackathonJudgeCardComponent {
  @Input() judge: IHackathonJudge;
  @Output() editJudgeEvent: EventEmitter<IHackathonJudge> = new EventEmitter();
  @Output() destroyJudgeEvent: EventEmitter<number> = new EventEmitter();
  constructor() {}

  editJudge(judge) {
    this.editJudgeEvent.emit(judge);
  }
  deleteJudge(judgeId) {
    this.destroyJudgeEvent.emit(judgeId);
  }
}
