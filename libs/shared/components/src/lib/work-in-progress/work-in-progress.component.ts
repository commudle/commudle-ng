import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss'],
})
export class WorkInProgressComponent implements OnInit {
  @Input() entityName;

  constructor() {}

  ngOnInit() {}
}
