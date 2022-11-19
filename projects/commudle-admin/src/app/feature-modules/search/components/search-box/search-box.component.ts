import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getPicture,
  getRoute,
  groupResults,
  navigate,
} from 'projects/commudle-admin/src/app/feature-modules/search/components/utils/search.utils';
import { SearchStatusService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SearchService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search.service';
import { ISearch, ISearchResult } from 'projects/shared-models/search.model';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() overrideSearchStatus = false;
  @Input() showSuggestions = true;
  @Input() shape: 'round' | 'rectangle' | 'semi-round';

  inputFormControl: FormControl;
  total = -1;
  groupedResults = {};
  searchLoader = false;
  searchStatus = true;

  // use getRoute
  getRoute = getRoute;
  navigate = navigate;
  getPicture = getPicture;

  @ViewChild('searchInput', { static: false }) searchInputRef: ElementRef<HTMLInputElement>;

  constructor(
    private searchService: SearchService,
    public searchStatusService: SearchStatusService,
    private router: Router,
  ) {
    this.inputFormControl = new FormControl('');
  }

  ngOnInit() {
    this.observeInput();
    this.observeSearchStatus();
  }

  observeInput() {
    this.inputFormControl.valueChanges
      .pipe(
        filter((value) => typeof value === 'string'),
        map((value: string) => value.trim().toLowerCase()),
        filter(Boolean),
        distinctUntilChanged(),
        tap(() => {
          if (!this.showSuggestions) {
            this.onSubmit();
          }
        }),
        filter(() => this.showSuggestions),
        tap(() => {
          this.searchLoader = true;
          this.groupedResults = {};
        }),
        debounceTime(500),
        switchMap((value: string) => this.searchService.getSearchResults(value)),
      )
      .subscribe((value: ISearch) => {
        this.groupedResults = groupResults(value.results);

        this.searchLoader = false;
        this.total = value.total;
      });
  }

  observeSearchStatus() {
    this.searchStatusService.searchStatus.subscribe((value: boolean) => {
      this.searchStatus = value;
    });
  }

  handleDisplay(result: ISearchResult | string) {
    return typeof result === 'string' ? result : result['query'] || result.name;
  }

  onSubmit() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.inputFormControl.value?.name || this.inputFormControl.value },
    });
    this.inputFormControl.reset('');
  }
}
