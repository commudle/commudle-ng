import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss']
})
export class WorkInProgressComponent implements OnInit {
  @Input() entityName;

  constructor() { }

  ngOnInit() {
  }

}
