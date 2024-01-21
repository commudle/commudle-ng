import { Component, Input, OnInit } from '@angular/core';
import { IHackathonJudge } from 'apps/shared-models/hackathon-judge.model';

@Component({
  selector: 'commudle-hackathon-judge-card',
  templateUrl: './hackathon-judge-card.component.html',
  styleUrls: ['./hackathon-judge-card.component.scss'],
})
export class HackathonJudgeCardComponent implements OnInit {
  @Input() judge: IHackathonJudge;
  constructor() {}

  ngOnInit() {}
}
