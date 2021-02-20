import {Component, Input, OnInit} from '@angular/core';
import {ILab} from 'projects/shared-models/lab.model';

@Component({
  selector: 'app-user-lab-card',
  templateUrl: './user-lab-card.component.html',
  styleUrls: ['./user-lab-card.component.scss']
})
export class UserLabCardComponent implements OnInit {

  @Input() lab: ILab;

  constructor() {
  }

  ngOnInit(): void {
  }

}
