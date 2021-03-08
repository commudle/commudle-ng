import {Component, Input, OnInit} from '@angular/core';
import {ILab} from 'projects/shared-models/lab.model';

@Component({
  selector: 'app-lab-display-card',
  templateUrl: './lab-display-card.component.html',
  styleUrls: ['./lab-display-card.component.scss'],
})
export class LabDisplayCardComponent implements OnInit {

  @Input() lab: ILab;

  constructor() {
  }

  ngOnInit(): void {
  }
}
