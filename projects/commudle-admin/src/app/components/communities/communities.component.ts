import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // page = 1;
  // count = 5;
  // total = 0;
  // activeCommunities: ICommunity[] = [];
  // communities: ICommunity[] = [];
  // isLoading = false;
  //
  // searchForm = this.fb.group({
  //   name: ['']
  // });
  //
  // constructor(
  //   private communitiesService: CommunitiesService,
  //   private fb: FormBuilder,
  //   private title: Title,
  //   private meta: Meta
  // ) { }
  //
  // ngOnInit() {
  //   this.setMeta();
  //   this.getCommunities();
  //   this.search();
  // }
  //
  //
  //
  // getCommunities() {
  //   this.isLoading = true;
  //   this.communitiesService.pGetCommunities(this.page, this.count, this.searchForm.get('name').value).subscribe(
  //     data => {
  //       this.communities = this.communities.concat(data.communities);
  //       this.isLoading = false;
  //       this.page = (+data.page);
  //       this.total = data.total;
  //
  //       if (this.communities.length < this.total) {
  //         this.page += 1;
  //         this.getCommunities();
  //       }
  //     }
  //   );
  // }
  //
  //
  // search() {
  //   this.searchForm.valueChanges.pipe(
  //     debounceTime(800),
  //     switchMap(() => {
  //       this.page = 1;
  //       this.isLoading = true;
  //       return this.communitiesService.pGetCommunities(this.page, this.count, this.searchForm.get('name').value);
  //     })
  //   ).subscribe(data => {
  //     this.communities = data.communities;
  //     this.isLoading = false;
  //     this.page = (+data.page) + 1;
  //     this.total = data.total;
  //     this.getCommunities();
  //   });
  // }
  //
  // setMeta() {
  //   this.title.setTitle('All Communities');
  //   this.meta.updateTag({ name: 'description', content: `Over 90 Communities and 20,000 Users are using Commudle.`});
  //
  //
  //   this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
  //   this.meta.updateTag({ name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
  //   this.meta.updateTag({ name: 'og:title', content: `All Communities` });
  //   this.meta.updateTag({ name: 'og:description', content: `Over 90 Communities and 20,000 Users are using Commudle.`});
  //   this.meta.updateTag( { name: 'og:type', content: 'website'});
  //
  //   this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
  //   this.meta.updateTag({ name: 'twitter:title', content: `All Communities` });
  //   this.meta.updateTag({ name: 'twitter:description', content: `Over 90 Communities and 20,000 Users are using Commudle.`});
  // }
  //
  //
  //
}
