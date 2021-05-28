import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {IHomeSearch} from 'projects/shared-models/home-search.model';
import {debounceTime} from 'rxjs/operators';
import {HomeService} from 'projects/commudle-admin/src/app/services/home.service';

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  // Search variables
  searchQuery = "";
  searchQueryChanged: Subject<string> = new Subject<string>();
  searchQueryChangedSubscription: Subscription;
  searchResults: IHomeSearch = {
    builds: [],
    communities: [],
    events: [],
    labs: [],
    users: [],
  };
  showSearchResults = false;
  showPlaceholder = true;
  showLoading = false;
  // Filters
  filterBy = ["builds", "communities", "events", "labs", "users"];
  filters: string[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    // Subscribe to search
    this.searchQueryChangedSubscription = this.searchQueryChanged
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.showLoading = true;
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
        return e.classList && e.classList.contains("cdk-overlay-pane");
      });

      if (clickingInSelect) return;
    }

    this.showSearchResults = value;
    this.borderChange(this.showSearchResults);
  }

  borderChange(showSearchResults) {
    var searchInput = document.getElementById("search-input");
    var searchSelect = document.getElementsByTagName("button")[0];

    if (showSearchResults) {
      searchInput.style.borderBottomLeftRadius = "0";
      searchSelect.style.borderBottomRightRadius = "0";
    } else {
      setTimeout(() => {
        searchInput.style.borderBottomLeftRadius = "8px";
      }, 300);
      setTimeout(() => {
        searchSelect.style.borderBottomRightRadius = "8px";
      }, 150);
    }
  }

  getSearchResults(query: string) {
    if (query !== "") {
      this.showPlaceholder = false;
      this.homeService
        .searchEverything(query, this.filters)
        .subscribe((value) => {
          this.showLoading = false;
          this.searchResults = value;
        });
    } else {
      this.searchResults = {
        builds: [],
        communities: [],
        events: [],
        labs: [],
        users: [],
      };
      this.showPlaceholder = true;
      this.showLoading = false;
    }
  }
}
