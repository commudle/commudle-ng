import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Location } from '@angular/common';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() overrideSearchStatus = false;
  @Input() showSuggestions = true;
  @Input() shape: 'round' | 'rectangle' | 'semi-round';

  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput', { static: false }) searchInputRef: ElementRef<HTMLInputElement>;

  inputFormControl: FormControl;
  query = '';
  total = -1;
  searchLoader = false;
  searchStatus = true;
  searchResults = [];
  users = [];
  communities = [];
  events = [];
  builds = [];
  labs = [];
  contents = [];
  staticAssets = staticAssets;

  moment = moment;
  showSearchBox = true;

  constructor(
    private searchService: SearchService,
    public searchStatusService: SearchStatusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.inputFormControl = new FormControl('');
  }

  ngOnInit() {
    this.showSearchBox = true;
    this.search();
    this.observeSearchStatus();
    this.activatedRoute.params.subscribe((params) => {
      if (params.query) {
        this.query = params.query;
        this.inputFormControl.setValue(this.query);
      }

      if (!params.query) {
        this.getNotifications();
      }
    });
  }

  search() {
    this.query = '';
    this.inputFormControl.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      this.query = this.inputFormControl.value?.name || this.inputFormControl.value;
      if (!this.showSuggestions) {
        this.onSubmit();
      }
      if (this.showSuggestions) {
        this.searchLoader = true;
        this.getNotifications();
      }
      this.searchInput.emit(this.query);
    });
  }

  generateParams(query) {
    const queryParams: { [key: string]: any } = {};

    if (query) {
      queryParams.q = query;
    }
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    this.location.replaceState(location.pathname, queryParamsString);
  }

  getNotifications() {
    this.searchResults = [];
    this.users = [];
    this.communities = [];
    this.events = [];
    this.builds = [];
    this.labs = [];
    this.contents = [];

    if (this.query === '') {
      this.total = -1;
      this.searchLoader = false;
      return;
    }

    this.searchService.getSearchResults(this.query).subscribe((value) => {
      this.searchResults = value.results.map((result) => {
        if (result?.type === 'User') {
          this.users.push(result);
        } else if (result?.type === 'Community') {
          this.communities.push(result);
        } else if (result?.type === 'Lab') {
          this.labs.push(result);
        } else if (result?.type === 'Community Build') {
          this.builds.push(result);
        } else if (result?.type === 'Event') {
          this.events.push(result);
        } else if (result?.type === 'SocialResource') {
          this.contents.push(result);
        }
        return result;
      });
      this.total = value.total;
      this.searchLoader = false;
    });
  }

  observeSearchStatus() {
    this.searchStatusService.searchStatus.subscribe((value: boolean) => {
      this.searchStatus = value;
    });
  }

  onSubmit() {
    this.query = this.query ? this.query : this.inputFormControl.value;
    this.router.navigate(['/search', this.query]);
    this.showSearchBox = false;
  }
}
