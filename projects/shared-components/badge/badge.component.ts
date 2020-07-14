import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() text;
  @Input() fontSize; //can be 'small or regular'
  @Input() color;
  @Input() nbIcon;

  bg;

  constructor() { }

  ngOnInit() {
    this.bg = this.backgroundColor();
  }


  backgroundColor() {
    return this.color || '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  }

}
