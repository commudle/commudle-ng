import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NbIconModule } from '@commudle/theme';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, NbIconModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() text;
  @Input() fontSize; //can be 'small or regular'
  @Input() color = 'com-text-white';
  @Input() nbIcon;
  @Input() dotMode;
  @Input() position;
  @Input() borderRadius: 'rectangle' | 'semi-round' | 'round' = 'semi-round';
  @Input() bgColor: string;
  @Input() randomColor = true;

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
    if (this.randomColor) {
      this.bg = this.backgroundColor();
    }
  }

  backgroundColor() {
    return this.color || '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }
}
