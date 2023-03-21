import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'commudle-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor() {}

  @Input() info: boolean;
  @Input() validation_error: boolean;
  ngOnInit(): void {}
}
