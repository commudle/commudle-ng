import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@commudle/theme';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { SysAdminFeaturedItemsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-items.service';

@Component({
  selector: 'commudle-create-featured-item',
  templateUrl: './create-featured-item.component.html',
  styleUrls: ['./create-featured-item.component.scss'],
})
export class CreateFeaturedItemComponent implements OnInit {
  @Input() entityType: 'CommunityBuild' | 'Kommunity' | 'Lab' | 'Event' | 'User' | 'CommunityChannel';
  reason: string;
  searchQuery: string;
  entityId: number;
  searchResult = [];

  constructor(
    private featuredService: SysAdminFeaturedItemsService,
    private searchService: SearchService,
    private dialogRef: NbDialogRef<any>,
  ) {}

  ngOnInit(): void {}

  changeInput() {
    if (this.searchQuery.length >= 3) {
      this.searchService.getSearchResultsByScope(this.searchQuery, 1, 10, this.entityType).subscribe((data) => {
        this.searchResult = data.results;
      });
    }
  }

  createFeaturedItems() {
    this.featuredService
      .createFeaturedItems({
        featured_item: { entity_type: this.entityType, entity_id: this.entityId, reason: this.reason },
      })
      .subscribe((data) => {
        this.close(data);
      });
  }

  close(data?) {
    this.dialogRef.close(data);
  }
}
