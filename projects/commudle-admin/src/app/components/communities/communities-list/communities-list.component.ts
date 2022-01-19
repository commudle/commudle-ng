import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss'],
})
export class CommunitiesListComponent implements OnInit, OnDestroy {
  communities: ICommunity[] = [];
  searchTags: string[] = [];

  // For search
  query = '';
  tag = '';
  page = 1;
  count = 6;
  total = -1;

  searchField: FormControl = new FormControl();

  subscriptions: Subscription[] = [];

  constructor(private communitiesService: CommunitiesService) {
    // do nothing
  }

  ngOnInit(): void {
    this.getSearchTags();
    this.getSearchResults();

    // Listening for inputs
    this.searchField.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe((value) => {
      this.query = value;
      this.getSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  changePage(value: number): void {
    this.page += value;
    if (this.page > Math.ceil(this.total / this.count)) {
      this.page = 1;
    }
    if (this.page < 1) {
      this.page = Math.ceil(this.total / this.count);
    }
    this.getSearchResults();
  }

  changeTag(value: string): void {
    this.tag = value === this.tag ? '' : value;
    this.getSearchResults();
  }

  getSearchTags(): void {
    this.subscriptions.push(
      this.communitiesService.getPopularTags().subscribe((value) => {
        this.searchTags = value;
      }),
    );
  }

  getSearchResults(): void {
    this.subscriptions.push(
      this.communitiesService.search(this.query, this.tag, this.page, this.count).subscribe((value) => {
        this.communities = value.communities;
        this.page = value.page;
        this.count = value.count;
        this.total = value.total;
      }),
    );
  }
}
