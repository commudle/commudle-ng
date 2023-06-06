import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { faUsers, faBuilding, faCalendar, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  subscriptions: Subscription[] = [];

  sidebarExpanded = true;

  //font-awesome
  faCalendar = faCalendar;
  faUsers = faUsers;
  faPenToSquare = faPenToSquare;
  faBuilding = faBuilding;

  constructor(private activatedRoute: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
      }),
    );
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }

  setMeta() {
    this.seoService.setTags(
      `Dashboard - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
