import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IFeaturesModel } from 'apps/shared-models/features.model';

@Component({
  selector: 'commudle-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  @Input() features: IFeaturesModel[];
  params = '';
  showSubHeading = [];
  faAdd = faAdd;
  faMinus = faMinus;
  selectedFeatureIndex: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.params = value.slug;
    });

    if (this.params) {
      this.router.navigate(['/features', this.params]);
    } else {
      this.router.navigate(['/features', this.features[0].slug.current]);
    }
  }

  toggleShowAnswers(index?: number) {
    for (let i = 0; i < this.showSubHeading.length; i++) {
      if (i !== index) {
        this.showSubHeading[i] = false;
      }
    }
    this.showSubHeading[index] = !this.showSubHeading[index];
    this.selectedFeatureIndex = index;
  }
}
