import { Component, OnInit } from '@angular/core';
import { RecommendationService } from 'projects/commudle-admin/src/app/feature-modules/recommendations/services/recommendation.service';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-recommended-communities',
  templateUrl: './recommended-communities.component.html',
  styleUrls: ['./recommended-communities.component.scss'],
})
export class RecommendedCommunitiesComponent implements OnInit {
  recommendedCommunities: ICommunity[] = [];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.getRecommendedCommunities();
  }

  getRecommendedCommunities(): void {
    this.recommendationService.getRecommendedCommunities().subscribe((communities: ICommunity[]) => {
      this.recommendedCommunities = communities;
    });
  }
}
