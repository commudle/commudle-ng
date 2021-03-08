import {Component, Input, OnInit} from '@angular/core';
import {ILab} from 'projects/shared-models/lab.model';

@Component({
  selector: 'app-header-text',
  templateUrl: './header-text.component.html',
  styleUrls: ['./header-text.component.scss']
})
export class HeaderTextComponent implements OnInit {

  @Input() tags: string[] = [];
  @Input() labs: ILab[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  getVisits() {
    let visits = 0;
    this.labs.forEach(lab => visits += lab.visits);
    return visits;
  }
}
