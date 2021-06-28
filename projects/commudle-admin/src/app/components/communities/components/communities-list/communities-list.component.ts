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
  styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit, OnDestroy {

  page = 1;
  count = 6;
  total = 0;
  communities: ICommunity[] = [];

  subscriptions: Subscription[] = [];

  // For search
  searchTags: string[] = [
    'Web Dev',
    'Machine Learning',
    'Design',
    'Java',
    'Analytics'
  ];
  selectedTag = '';
  searchedCommunities: ICommunity[] = [];
  searchField: FormControl = new FormControl();

  constructor(
    private title: Title,
    private meta: Meta,
    private communitiesService: CommunitiesService
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.getCommunities();

    // Search bar
    this.searchField.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(value => this.getSearchResults(value));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  setMeta() {
    this.title.setTitle('All Communities');
    this.meta.updateTag({name: 'description', content: 'Over 90 Communities and 20,000 Users are using Commudle.'});

    this.meta.updateTag({name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({name: 'og:title', content: 'All Communities'});
    this.meta.updateTag({name: 'og:description', content: 'Over 90 Communities and 20,000 Users are using Commudle.'});
    this.meta.updateTag({name: 'og:type', content: 'website'});

    this.meta.updateTag({name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'twitter:title', content: 'All Communities'});
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Over 90 Communities and 20,000 Users are using Commudle.'
    });
  }

  getCommunities() {
    this.subscriptions.push(this.communitiesService.pGetCommunities(this.page, this.count, '').subscribe(value => {
      this.communities = value.communities;
      this.total = +value.total;
      this.searchedCommunities = this.communities;
    }));
  }

  changePage(value: number) {
    this.page = (this.page + value) % Math.ceil(this.total / this.count);
    this.getCommunities();
  }

  changeSelectedTag(query: string) {
    this.selectedTag = query === this.selectedTag ? '' : query;
    if (this.selectedTag !== '') {
      this.subscriptions.push(this.communitiesService.searchByTag(this.selectedTag).subscribe(value => {
        this.searchedCommunities = value;
      }));
    } else {
      this.searchedCommunities = this.communities;
    }
  }

  getSearchResults(query: string) {
    if (query === '' || query.length < 3) {
      this.searchedCommunities = this.communities;
    } else {
      this.subscriptions.push(this.communitiesService.searchByName(query).subscribe(value => {
        this.searchedCommunities = value;
      }));
    }
    this.selectedTag = '';
  }

}
