import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {LabsService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import {LabsHomeService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs-home.service';
import {ITag} from 'projects/shared-models/tag.model';
import {NbMenuService} from '@nebular/theme';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  labFilters = [];
  subscriptions: Subscription[] = [];

  tagSearchParam = '';
  tagSearchResults: ITag[] = [];
  showTagSearchResults = false;

  @Input() labSearchParams: string[] = [];

  @Output() updateTags: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild('searchBar') searchBar: ElementRef<HTMLInputElement>;

  // @ViewChild('searchResultsDiv') searchResultsDiv: ElementRef<HTMLDivElement>;

  constructor(
    private labsService: LabsService,
    private labsHomeService: LabsHomeService,
    private menuService: NbMenuService,
  ) {
  }

  ngOnInit(): void {
    // Initialize Context Menu
    this.setLabFilters();
    // Subscribe to tag search results
    this.labsHomeService.tagSearch$.subscribe(data => this.tagSearchResults = data);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setLabFilters() {
    this.labFilters.push({
      title: 'Popular Labs'
    });
    this.labFilters.push({
      title: 'New Labs'
    });
    this.labFilters.push({
      title: 'Labs By Experts'
    });

    this.handleLabFilters();
  }

  handleLabFilters() {
    this.subscriptions.push(
      this.menuService.onItemClick().pipe(
        map(({item: title}) => title)
      ).subscribe(menuItem => {
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
      })
    );
  }

  getTagSearchResults() {
    if (this.tagSearchParam !== '') {
      this.labsHomeService.getTagSearchResults(this.tagSearchParam.split(' '));
    } else {
      this.tagSearchResults = [];
    }
  }

  toggleSearchSuffix(value: boolean) {
    this.showTagSearchResults = value;
    // this.searchResultsDiv.nativeElement.style.display = value ? 'flex' : 'none';
  }

  onTagAdd(value: string, clearInput: boolean = true) {
    if (value !== '' && !this.labSearchParams.includes(value)) {
      this.labSearchParams.push(value);
      // Get labs from service
      this.labsHomeService.getLabSearchResults(this.labSearchParams);
      // Emit new set of tags
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
    setTimeout(() => this.showTagSearchResults = true);
    this.labSearchParams = this.labSearchParams.filter(tag => tag !== value);
    // Get labs from service
    this.labsHomeService.getLabSearchResults(this.labSearchParams);
    // Emit new set of tags
    this.updateTags.emit(this.labSearchParams);
  }
}
