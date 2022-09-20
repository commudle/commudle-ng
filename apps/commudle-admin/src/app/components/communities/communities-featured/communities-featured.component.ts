import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { IFeaturedCommunity } from '@commudle/shared-models';
import { FeaturedCommunitiesService } from '../../../services/featured-communities.service';

@Component({
  selector: 'commudle-communities-featured',
  templateUrl: './communities-featured.component.html',
  styleUrls: ['./communities-featured.component.scss'],
})
export class CommunitiesFeaturedComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];
  environment = environment;

  constructor(
    private featuredCommunitiesService: FeaturedCommunitiesService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities.slice(0, 4);
      // this.changeDetectorRef.markForCheck();
    });
  }
}
