import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription, map } from 'rxjs';
import {
  faUserGroup,
  faCircleInfo,
  faComments,
  faHashtag,
  faCalendarWeek,
  faArrowTrendUp,
  faBuilding,
  faPencil,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { NbMenuService } from '@commudle/theme';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { EDbModels } from '@commudle/shared-models';

interface CustomMenuItem {
  title: string;
  slug: string;
}

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
  faCaretDown = faCaretDown;

  items = [{ title: 'pages', slug: 'pages' }];

  EDbModels = EDbModels;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communityGroupsService: CommunityGroupsService,
    private nbMenuService: NbMenuService,
    private customPageService: CustomPageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.items = [];
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
        this.checkOrganizer();
        this.getCustomPages();
      }),
    );
  }

  getCustomPages() {
    this.subscriptions.push(
      this.customPageService.getPIndex(this.communityGroup.slug, EDbModels.COMMUNITY_GROUP).subscribe((data) => {
        this.items = [];
        for (const page of data) {
          const newItem = { title: page.title, slug: page.slug };
          this.items.push(newItem);
        }
      }),
    );
    this.nbMenuService
      .onItemClick()
      .pipe(map(({ item }) => item as CustomMenuItem))
      .subscribe(({ title, slug }) => {
        this.router.navigate(['orgs', this.communityGroup.slug, 'p', slug]);
      });
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
