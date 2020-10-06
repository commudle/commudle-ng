import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from '../../../services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  communities: ICommunity[] = [];

  constructor(
    private communitiesService: CommunitiesService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.setMeta();
    this.getAllCommunities();
  }


  getAllCommunities() {
    this.communitiesService.pGetCommunities().subscribe(
      data => {
        this.communities = data.communities;
      }
    );
  }

  setMeta() {
    this.title.setTitle('All Communities');
    this.meta.updateTag({ name: 'description', content: `Over 90 Communities and 20,000 Users are using Commudle.`});


    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:title', content: `All Communities` });
    this.meta.updateTag({ name: 'og:description', content: `Over 90 Communities and 20,000 Users are using Commudle.`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `All Communities` });
    this.meta.updateTag({ name: 'twitter:description', content: `Over 90 Communities and 20,000 Users are using Commudle.`});
  }



}
