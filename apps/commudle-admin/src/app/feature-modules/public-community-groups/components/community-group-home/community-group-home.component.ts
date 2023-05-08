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
  faBuilding,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';

@Component({
  selector: 'app-community-group-home',
  templateUrl: './community-group-home.component.html',
  styleUrls: ['./community-group-home.component.scss'],
})
export class CommunityGroupHomeComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  subscriptions: Subscription[] = [];
  isOrganizer = false;

  //icons
  faUserGroup = faUserGroup;
  faCircleInfo = faCircleInfo;
  faComments = faComments;
  faHashtag = faHashtag;
  faCalendarWeek = faCalendarWeek;
  faArrowTrendUp = faArrowTrendUp;
  faBuilding = faBuilding;
  faPencil = faPencil;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communityGroupsService: CommunityGroupsService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
        this.checkOrganizer();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  checkOrganizer() {
    this.subscriptions.push(
      this.communityGroupsService.userManagedCommunityGroups$.subscribe((data: ICommunityGroup[]) => {
        if (data.find((communityGroupData) => communityGroupData.slug === this.communityGroup.slug) !== undefined) {
          this.isOrganizer = true;
        }
      }),
    );
  }

  setMeta(): void {
    this.seoService.setTags(
      this.communityGroup.name,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
