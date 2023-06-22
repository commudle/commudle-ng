import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-badge',
  // standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() text;
  @Input() fontSize; //can be 'small or regular'
  @Input() color;
  @Input() nbIcon;
  @Input() dotMode;
  @Input() position;
  @Input() fontColor = 'white';
  @Input() borderRadius: 'rectangle' | 'semi-round' | 'round' = 'semi-round';
  @Input() bgColor: string;

  bg;

  @HostBinding('class')
  get themeClass() {
    if (this.position) {
      return this.position;
    }
    return '';
  }

  constructor() {}

  ngOnInit() {
    if (this.bgColor === undefined) {
      this.bg = this.backgroundColor();
    }
  }

  backgroundColor() {
    return this.color || '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }
}
