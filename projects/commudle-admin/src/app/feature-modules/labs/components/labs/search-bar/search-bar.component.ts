import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LabsService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import {LabsHomeService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs-home.service';
import {ITag} from 'projects/shared-models/tag.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filterLabItems = [
    {title: 'Popular Labs'},
    {title: 'New Labs'},
    {title: 'Labs by Experts'}
  ];

  tagSearchParam = '';
  tagSearchResults: ITag[] = [];
  labSearchParams: string[] = [];

  @ViewChild('searchBar') searchBar: ElementRef<HTMLInputElement>;
  @ViewChild('searchParamsDiv') searchParamsDiv: ElementRef<HTMLDivElement>;
  @ViewChild('searchResultsDiv') searchResultsDiv: ElementRef<HTMLDivElement>;

  constructor(
    private labsService: LabsService,
    private labsHomeService: LabsHomeService
  ) {
  }

  ngOnInit(): void {
    // Subscribe to tag search results
    this.labsHomeService.tagSearch$.subscribe(data => this.tagSearchResults = data);
  }

  getTagSearchResults() {
    if (this.tagSearchParam !== '') {
      this.labsHomeService.getTagSearchResults(Array(this.tagSearchParam));
    } else {
      this.tagSearchResults = [];
    }
  }

  toggleSearchSuffix(value: boolean) {
    this.searchResultsDiv.nativeElement.style.display = value ? 'flex' : 'none';
  }

  onTagAdd(value: string, clearInput: boolean = true) {
    if (value !== '' && !this.labSearchParams.includes(value)) {
      this.labSearchParams.push(value);
      this.labsHomeService.getLabSearchResults(this.labSearchParams);
    }
    if (clearInput) {
      this.searchBar.nativeElement.value = '';
      this.tagSearchParam = '';
      this.tagSearchResults = [];
    }
  }

  onTagDelete(value: string) {
    this.labSearchParams = this.labSearchParams.filter(tag => tag !== value);
    this.labsHomeService.getLabSearchResults(this.labSearchParams);
    // TODO: Not sure how else to stop the div from closing
    setTimeout(() => this.searchResultsDiv.nativeElement.style.display = 'flex', 0);
  }
}
