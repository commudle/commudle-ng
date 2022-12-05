import { Component, Input, OnInit } from '@angular/core';
import { ILab } from 'apps/shared-models/lab.model';

@Component({
  selector: 'app-labs-card',
  templateUrl: './labs-card.component.html',
  styleUrls: ['./labs-card.component.scss'],
})
export class LabsCardComponent implements OnInit {
  @Input() lab: ILab;

  constructor() {}

  ngOnInit(): void {}
}
