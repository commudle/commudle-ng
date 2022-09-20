import { Component, Input, OnInit } from '@angular/core';
import { ILab } from '@commudle/shared-models';

@Component({
  selector: 'commudle-labs-card',
  templateUrl: './labs-card.component.html',
  styleUrls: ['./labs-card.component.scss'],
})
export class LabsCardComponent implements OnInit {
  @Input() lab: ILab;

  constructor() {}

  ngOnInit(): void {}
}
