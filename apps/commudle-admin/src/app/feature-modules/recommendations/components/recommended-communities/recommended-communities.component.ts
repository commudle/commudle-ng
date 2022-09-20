import { Component, OnInit } from '@angular/core';
import { RecommendationService } from 'apps/commudle-admin/src/app/feature-modules/recommendations/services/recommendation.service';
import { ICommunity } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-recommended-communities',
  templateUrl: './recommended-communities.component.html',
  styleUrls: ['./recommended-communities.component.scss'],
})
export class RecommendedCommunitiesComponent implements OnInit {
  recommendedCommunities: ICommunity[] = [];

  constructor(private recommendationService: RecommendationService, private libAuthwatchService: LibAuthwatchService) {}

  ngOnInit(): void {
    this.libAuthwatchService.currentUser$.subscribe((user) => {
      if (user) {
        this.getRecommendedCommunities();
      }
    });
  }

  getRecommendedCommunities(): void {
    this.recommendationService.getRecommendedCommunities().subscribe((communities: ICommunity[]) => {
      this.recommendedCommunities = communities;
    });
  }
}
