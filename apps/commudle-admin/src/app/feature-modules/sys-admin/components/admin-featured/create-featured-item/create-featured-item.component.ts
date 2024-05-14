import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EDbModels } from '@commudle/shared-models';
import { NbDialogRef } from '@commudle/theme';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { SysAdminFeaturedItemsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-items.service';
import { ISearch } from 'apps/shared-models/search.model';
import { distinctUntilChanged, switchMap } from 'rxjs';
import { ECategoryType } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-create-featured-item',
  templateUrl: './create-featured-item.component.html',
  styleUrls: ['./create-featured-item.component.scss'],
})
export class CreateFeaturedItemComponent implements OnInit {
  @Input() entityType: EDbModels;
  reason: string;
  searchQuery: string;
  entityId: number;
  searchResult = [];
  page = 1;
  count = 10;
  selectedEntityValue: string;

  inputFormControl: FormControl;
  EDbModels = EDbModels;
  categoryType = '';
  ECategoryType = ECategoryType;

  constructor(
    private featuredService: SysAdminFeaturedItemsService,
    private searchService: SearchService,
    private dialogRef: NbDialogRef<any>,
  ) {
    this.inputFormControl = new FormControl('');
  }

  ngOnInit(): void {
    this.observeInput();
  }

  observeInput() {
    this.inputFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((value: string) =>
          this.searchService.getSearchResultsByScope(value, this.page, this.count, this.entityType),
        ),
      )
      .subscribe((value: ISearch) => {
        this.searchResult = value.results;
      });
  }

  createFeaturedItems() {
    this.featuredService
      .createFeaturedItems({
        featured_item: {
          entity_type: this.entityType,
          entity_id: this.entityId,
          reason: this.reason,
          category_type: this.categoryType,
        },
      })
      .subscribe((data) => {
        this.close(data);
      });
  }

  selected(value, name) {
    this.entityId = value;
    this.selectedEntityValue = name;
  }

  close(data?) {
    this.dialogRef.close(data);
  }
}
