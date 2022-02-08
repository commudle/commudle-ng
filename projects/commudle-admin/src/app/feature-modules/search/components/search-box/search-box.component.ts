import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getPicture,
  groupResults,
  navigate,
} from 'projects/commudle-admin/src/app/feature-modules/search/components/utils/search.utils';
import { SearchService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search.service';
import { ISearch, ISearchResult } from 'projects/shared-models/search.model';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  inputFormControl: FormControl;
  total = -1;
  groupedResults = {};

  searchLoader = false;

  navigate = navigate;
  getPicture = getPicture;

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;

  constructor(private searchService: SearchService, private router: Router) {
    this.inputFormControl = new FormControl('');
  }

  ngOnInit() {
    this.observeInput();
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.blur();
  }

  observeInput() {
    this.inputFormControl.valueChanges
      .pipe(
        filter((value) => typeof value === 'string'),
        map((value: string) => value.trim().toLowerCase()),
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.searchLoader = true;
          this.groupedResults = {};
        }),
        switchMap((value: string) => this.searchService.getSearchResults(value)),
      )
      .subscribe((value: ISearch) => {
        this.searchLoader = false;
        this.total = value.total;

        this.groupedResults = groupResults(value.results);
      });
  }

  handleDisplay(result: ISearchResult | string) {
    return typeof result === 'string' ? result : result['query'] || result.name;
  }
}
