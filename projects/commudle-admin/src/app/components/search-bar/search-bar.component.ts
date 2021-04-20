import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {IHomeSearch} from 'projects/shared-models/home-search.model';
import {debounceTime} from 'rxjs/operators';
import {HomeService} from 'projects/commudle-admin/src/app/services/home.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  // Search variables
  searchQuery = '';
  searchQueryChanged: Subject<string> = new Subject<string>();
  searchQueryChangedSubscription: Subscription;
  searchResults: IHomeSearch = {
    builds: [],
    communities: [],
    events: [],
    labs: [],
    users: []
  };
  showSearchResults = false;
  showPlaceholder = true;
  // Filters
  filterBy = ['builds', 'communities', 'events', 'labs', 'users'];
  filters: string[] = [];

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    // Subscribe to search
    this.searchQueryChangedSubscription = this.searchQueryChanged.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      this.searchQuery = value;
      this.getSearchResults(value);
    });
  }

  ngOnDestroy(): void {
    this.searchQueryChangedSubscription.unsubscribe();
  }

  getSelectedFilters(event: string[]) {
    this.filters = event;
    this.searchQueryChanged.next(this.searchQuery);
  }

  toggleSearchSuffix(value: boolean, event?: Event) {
    if (event) {
      const clickingInSelect = (event as any).path.some((e: HTMLElement) => {
        return e.classList && e.classList.contains('cdk-overlay-pane');
      });

      if (clickingInSelect) return;
    }

    this.showSearchResults = value;
  }

  getSearchResults(query: string) {
    if (query !== '') {
      this.homeService.searchEverything(query, this.filters).subscribe(value => this.searchResults = value);
      this.showPlaceholder = false;
    } else {
      this.searchResults = {
        builds: [],
        communities: [],
        events: [],
        labs: [],
        users: []
      };
      this.showPlaceholder = true;
    }
  }

}
