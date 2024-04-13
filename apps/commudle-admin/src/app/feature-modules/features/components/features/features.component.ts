import { Component, Input, OnInit } from '@angular/core';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IFeaturesModel } from 'apps/shared-models/features.model';

@Component({
  selector: 'commudle-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  @Input() features: IFeaturesModel[];
  showSubHeading = [];
  faAdd = faAdd;
  faMinus = faMinus;

  constructor() {}

  ngOnInit(): void {}

  toggleShowAnswers(index: number) {
    this.showSubHeading[index] = !this.showSubHeading[index];
  }
}
