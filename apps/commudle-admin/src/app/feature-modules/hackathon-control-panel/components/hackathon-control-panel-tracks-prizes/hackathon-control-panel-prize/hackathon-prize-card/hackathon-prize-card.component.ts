import { Component, Input, OnInit } from '@angular/core';
import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';

@Component({
  selector: 'commudle-hackathon-prize-card',
  templateUrl: './hackathon-prize-card.component.html',
  styleUrls: ['./hackathon-prize-card.component.scss'],
})
export class HackathonPrizeCardComponent implements OnInit {
  @Input() hackathonPrize: IHackathonPrize;

  constructor() {}

  ngOnInit() {}
}
