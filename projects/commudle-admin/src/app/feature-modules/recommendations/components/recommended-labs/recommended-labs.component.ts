import { Component, OnInit } from '@angular/core';
import { RecommendationService } from 'projects/commudle-admin/src/app/feature-modules/recommendations/services/recommendation.service';
import { ILab } from 'projects/shared-models/lab.model';

@Component({
  selector: 'app-recommended-labs',
  templateUrl: './recommended-labs.component.html',
  styleUrls: ['./recommended-labs.component.scss'],
})
export class RecommendedLabsComponent implements OnInit {
  recommendedLabs: ILab[] = [];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.getRecommendedLabs();
  }

  getRecommendedLabs() {
    this.recommendationService.getRecommendedLabs().subscribe((labs: ILab[]) => {
      this.recommendedLabs = labs;
    });
  }
}
