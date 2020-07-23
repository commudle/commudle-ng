import { Component, OnInit, Input } from '@angular/core';
import { ILabStep } from 'projects/shared-models/lab-step.model';

@Component({
  selector: 'app-lab-step',
  templateUrl: './lab-step.component.html',
  styleUrls: ['./lab-step.component.scss']
})
export class LabStepComponent implements OnInit {
  @Input() step: ILabStep;

  constructor() { }

  ngOnInit() {
  }

}
