import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ICommunity} from 'projects/shared-models/community.model';
import {CommunitiesService} from 'projects/commudle-admin/src/app/services/communities.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit {

  page = 1;
  count = 6;
  total = 0;
  communities: ICommunity[] = [];

  subscription: Subscription;

  constructor(
    private title: Title,
    private meta: Meta,
    private communitiesService: CommunitiesService
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.getCommunities();
  }

  setMeta() {
    this.title.setTitle('All Communities');
    this.meta.updateTag({name: 'description', content: 'Over 90 Communities and 20,000 Users are using Commudle.'});

    this.meta.updateTag({name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'og:title', content: 'All Communities'});
    this.meta.updateTag({name: 'og:description', content: 'Over 90 Communities and 20,000 Users are using Commudle.'});
    this.meta.updateTag({name: 'og:type', content: 'website'});

    this.meta.updateTag({name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'twitter:title', content: 'All Communities'});
    this.meta.updateTag({name: 'twitter:description', content: 'Over 90 Communities and 20,000 Users are using Commudle.'});
  }

  getCommunities() {
    this.communitiesService.pGetCommunities(this.page, this.count, '').subscribe(value => {
      this.communities = value.communities;
      this.total = +value.total;
    });
  }

  changePage(value: number) {
    this.page = (this.page + value) % Math.ceil(this.total / this.count);
    this.getCommunities();
  }

}
