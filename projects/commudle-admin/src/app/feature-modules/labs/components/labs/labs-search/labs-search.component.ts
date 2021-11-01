import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { LabsService } from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { ITag } from 'projects/shared-models/tag.model';
import { ITags } from 'projects/shared-models/tags.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-labs-search',
  templateUrl: './labs-search.component.html',
  styleUrls: ['./labs-search.component.scss'],
})
export class LabsSearchComponent implements OnInit, OnDestroy {
  labFilters = [];

  tagSearchParam = '';
  tagSearchResults: ITag[] = [];
  showTagSearchResults = false;

  @Input() labSearchParams: string[] = [];

  @Output() updateTags: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild('searchBar') searchBar: ElementRef<HTMLInputElement>;

  subscriptions: Subscription[] = [];

  constructor(private labsService: LabsService, private menuService: NbMenuService) {}

  ngOnInit(): void {
    this.setLabFilters();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setLabFilters() {
    const filters = ['Popular Labs', 'New Labs', 'Labs By Experts'];
    filters.forEach((filter: string) => this.labFilters.push({ title: filter }));

    this.handleLabFilters();
  }

  handleLabFilters() {
    this.subscriptions.push(
      this.menuService
        .onItemClick()
        .pipe(map(({ item: title }) => title))
        .subscribe((menuItem: NbMenuItem) => {
          switch (menuItem.title) {
            case 'Popular Labs': {
              break;
            }
            case 'New Labs': {
              break;
            }
            case 'Labs By Experts': {
              break;
            }
          }
        }),
    );
  }

  getTagSearchResults() {
    if (this.tagSearchParam !== '') {
      this.labsService
        .searchTags(this.tagSearchParam.split(' '))
        .subscribe((value: ITags) => (this.tagSearchResults = value.tags));
    } else {
      this.tagSearchResults = [];
    }
  }

  toggleSearchSuffix(value: boolean) {
    this.showTagSearchResults = value;
  }

  onTagAdd(value: string, clearInput: boolean = true) {
    if (value !== '' && !this.labSearchParams.includes(value)) {
      this.labSearchParams.push(value);
      this.updateTags.emit(this.labSearchParams);
    }
    if (clearInput) {
      this.searchBar.nativeElement.value = '';
      this.tagSearchParam = '';
      this.tagSearchResults = [];
    }
  }

  onTagDelete(value: string) {
    // TODO: Not sure how else to stop the div from closing
    setTimeout(() => (this.showTagSearchResults = true));

    this.labSearchParams = this.labSearchParams.filter((tag: string) => tag !== value);
    this.updateTags.emit(this.labSearchParams);
  }
}
