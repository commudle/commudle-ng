import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  getPicture,
  getTitle,
  navigate,
} from 'projects/commudle-admin/src/app/feature-modules/search/components/utils/search.utils';
import { SearchStatusService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SearchService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search.service';
import { ISearch } from 'projects/shared-models/search.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  results = [];
  page = 1;
  count = 15;
  total = -1;
  query: string;
  filters = [];
  selectedFilters = [];

  searchLoader = false;
  loadMoreLoader = false;

  getPicture = getPicture;
  getTitle = getTitle;
  navigate = navigate;

  constructor(
    private searchService: SearchService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchStatusService: SearchStatusService,
  ) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
    this.searchStatusService.setSearchStatus(false);

    this.getData();
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.searchStatusService.setSearchStatus(true);
  }

  getData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchLoader = true;

      this.results = [];
      this.total = -1;
      this.page = 1;
      this.filters = [];
      this.selectedFilters = [];

      this.query = params.q;
      this.getSearchData();
    });
  }

  getSearchData() {
    this.loadMoreLoader = true;
    this.searchService.getSearchResults(this.query, this.page, this.count).subscribe((value: ISearch) => {
      this.seoService.setTitle(`Search results for "${this.query}"`);

      this.results = [...this.results, ...value.results];
      this.total = value.total;
      this.page++;
      this.filters = [
        ...new Set(
          this.results.map((result) => {
            if (result) {
              return result.type;
            }
          }),
        ),
      ];

      this.searchLoader = false;
      this.loadMoreLoader = false;
    });
  }

  onFilterChange(filter: string) {
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters.push(filter);
    }
  }

  getResults() {
    const filters = this.selectedFilters.length ? this.selectedFilters : this.filters;
    return this.results.filter((result) => {
      if (result) {
        return filters.includes(result.type);
      }
    });
  }
}
