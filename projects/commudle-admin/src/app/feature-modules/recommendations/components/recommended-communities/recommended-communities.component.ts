import { Component, OnInit } from '@angular/core';
import { RecommendationService } from 'projects/commudle-admin/src/app/feature-modules/recommendations/services/recommendation.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-recommended-communities',
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
