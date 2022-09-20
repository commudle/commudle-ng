import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SysAdminFeaturedCommunitiesService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-communities.service';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from '@commudle/shared-models';
import { IFeaturedCommunity } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-admin-featured-communities',
  templateUrl: './admin-featured-communities.component.html',
  styleUrls: ['./admin-featured-communities.component.scss'],
})
export class AdminFeaturedCommunitiesComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[];
  page: number;
  count: number;
  total: number;

  reason = '';
  selectedCommunity: ICommunity;

  communities: ICommunity[] = [];

  constructor(
    private nbDialogService: NbDialogService,
    private libToastLogService: LibToastLogService,
    private communitiesService: CommunitiesService,
    private sysAdminFeaturedCommunitiesService: SysAdminFeaturedCommunitiesService,
  ) {
    // do nothing
  }

  ngOnInit(): void {
    this.setIndexParams();
    this.getFeaturedCommunities();
  }

  setIndexParams(): void {
    this.featuredCommunities = [];
    this.page = 1;
    this.count = 5;
    this.total = -1;
  }

  getFeaturedCommunities(): void {
    if (this.featuredCommunities.length !== this.total) {
      this.sysAdminFeaturedCommunitiesService.getAllFeaturedCommunities().subscribe((value) => {
        this.featuredCommunities = this.featuredCommunities.concat(value.featured_communities);
        this.page = +value.page;
        this.total = +value.total;
        this.page += 1;
      });
    }
  }

  openDialog(templateRef: TemplateRef<any>, featuredCommunityId: number = null, setReason: boolean = false): void {
    this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: {
        id: featuredCommunityId,
      },
    });
    if (setReason) {
      this.reason = this.featuredCommunities.find((value) => value.id === featuredCommunityId).reason;
    }
  }

  onInputChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.length >= 3) {
      this.communitiesService.searchByName(query).subscribe((value) => {
        this.communities = value;
      });
    }
  }

  onSelectionChange(community: ICommunity): void {
    this.selectedCommunity = community;
    this.communities = [];
  }

  onSelectionDelete(): void {
    this.selectedCommunity = undefined;
    this.communities = [];
  }

  createFeaturedCommunity(): void {
    this.sysAdminFeaturedCommunitiesService
      .createFeaturedCommunity(this.selectedCommunity.id, { featured_community: { reason: this.reason } })
      .subscribe(() => {
        this.libToastLogService.successDialog('Created featured community successfully');
        this.selectedCommunity = undefined;
        this.reason = '';
        this.setIndexParams();
        this.getFeaturedCommunities();
      });
  }

  updateFeaturedCommunity(featuredCommunityId: number): void {
    this.sysAdminFeaturedCommunitiesService
      .updateFeaturedCommunity(featuredCommunityId, { featured_community: { reason: this.reason } })
      .subscribe(() => {
        this.libToastLogService.successDialog('Updated featured community successfully');
        this.reason = '';
        this.setIndexParams();
        this.getFeaturedCommunities();
      });
  }

  deleteFeaturedCommunity(featuredCommunityId: number): void {
    this.sysAdminFeaturedCommunitiesService.deleteFeaturedCommunity(featuredCommunityId).subscribe((value) => {
      if (value) {
        this.libToastLogService.successDialog('Deleted featured community successfully');
        this.setIndexParams();
        this.getFeaturedCommunities();
      }
    });
  }
}
