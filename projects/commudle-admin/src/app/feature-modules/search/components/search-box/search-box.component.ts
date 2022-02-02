import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

        this.groupedResults = this.groupResults(value.results);
      });
  }

  groupResults(value: ISearchResult[]) {
    return value.reduce((r, a) => {
      r[a.type] = [...(r[a.type] || []), a];
      return r;
    }, {});
  }

  handleDisplay(result: ISearchResult | string) {
    return typeof result === 'string' ? result : result.name;
  }

  navigate(option: ISearchResult) {
    switch (option.type) {
      case 'User':
        this.router.navigate(['/users', 'username' in option ? option.username : null]);
        break;
      case 'Lab':
        this.router.navigate(['/labs', 'slug' in option ? option.slug : null]);
        break;
      case 'Kommunity':
        this.router.navigate(['/communities', 'slug' in option ? option.slug : null]);
        break;
      case 'CommunityBuild':
        this.router.navigate(['/builds', 'slug' in option ? option.slug : null]);
        break;
      case 'Event':
        this.router.navigate([
          '/communities',
          'kommunity_slug' in option ? option.kommunity_slug : null,
          'events',
          'slug' in option ? option.slug : null,
        ]);
        break;
    }
  }
}
