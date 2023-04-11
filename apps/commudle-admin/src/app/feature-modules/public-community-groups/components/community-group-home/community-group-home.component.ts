import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import {
  faUserGroup,
  faCircleInfo,
  faComments,
  faHashtag,
  faCalendarWeek,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-group-home',
  templateUrl: './community-group-home.component.html',
  styleUrls: ['./community-group-home.component.scss'],
})
export class CommunityGroupHomeComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  subscriptions: Subscription[] = [];

  //icons
  faUserGroup = faUserGroup;
  faCircleInfo = faCircleInfo;
  faComments = faComments;
  faHashtag = faHashtag;
  faCalendarWeek = faCalendarWeek;
  faArrowTrendUp = faArrowTrendUp;

  constructor(private activatedRoute: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setMeta(): void {
    this.seoService.setTags(
      this.communityGroup.name,
      this.communityGroup.description.replace(/<[^>]*>/g, ''),
      this.communityGroup.logo.url,
    );
  }
}
