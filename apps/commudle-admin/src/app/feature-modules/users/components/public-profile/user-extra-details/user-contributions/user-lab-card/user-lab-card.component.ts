import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ILab } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-lab-card',
  templateUrl: './user-lab-card.component.html',
  styleUrls: ['./user-lab-card.component.scss'],
})
export class UserLabCardComponent implements OnChanges {
  @Input() lab: ILab;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lab) {
      this.setDescription();
    }
  }

  setDescription() {
    // Decode HTML
    const txt = document.createElement('textarea');
    txt.innerHTML = this.lab.description;
    const htmlContent = txt.value;
    // Remove HTML tags and assign to the lab description
    this.lab.description = htmlContent.replace(/<[^>]+>/g, '');
  }
}
