import { Component, Input, OnInit } from '@angular/core';
import { ILab } from 'projects/shared-models/lab.model';

@Component({
  selector: 'app-user-lab-card',
  templateUrl: './user-lab-card.component.html',
  styleUrls: ['./user-lab-card.component.scss'],
})
export class UserLabCardComponent implements OnInit {
  @Input() lab: ILab;

  constructor() {}

  ngOnInit(): void {}

  getDescription() {
    // Decode HTML
    const txt = document.createElement('textarea');
    txt.innerHTML = this.lab.description;
    const htmlContent = txt.value;
    // Remove HTML tags, take the first 100 characters and add '...'
    return htmlContent
      .replace(/<[^>]+>/g, '')
      .substr(0, 120)
      .concat('...');
  }
}
