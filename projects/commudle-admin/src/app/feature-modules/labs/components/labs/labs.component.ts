import {Component, OnInit} from '@angular/core';
import {ILab} from 'projects/shared-models/lab.model';
import {LabsService} from '../../services/labs.service';
import {Meta, Title} from '@angular/platform-browser';
import {ITag} from 'projects/shared-models/tag.model';
import {LabsHomeService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs-home.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent implements OnInit {

  popularTags: ITag[] = [];
  popularLabs: ILab[] = [];

  searchedTags: string[] = [];
  searchedLabs: ILab[] = [];

  constructor(
    private meta: Meta,
    private title: Title,
    private labsService: LabsService,
    private labsHomeService: LabsHomeService
  ) {
  }

  ngOnInit() {
    // Get popular tags and labs
    this.getPopularTags();
    this.getPopularLabs();
    // Set meta details
    this.setMeta();
    // Subscribe to searched lab updates
    this.getSearchedLabs();
  }

  setMeta() {
    this.title.setTitle('Labs | Learn Something New!');
    this.meta.updateTag({
      name: 'description',
      content: 'The best way to learn, is step by step. We introduce Labs, a place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!',
    });
    this.meta.updateTag({
      name: 'og:image',
      content: `https://commudle.com/assets/images/commudle-logo192.png`,
    });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: `https://commudle.com/assets/images/commudle-logo192.png`,
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Labs | Learn Something New!',
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'The best way to learn, is step by step. We introduce Labs, a place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!',
    });
    this.meta.updateTag({
      name: 'og:type',
      content: 'website'
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `https://commudle.com/assets/images/commudle-logo192.png`,
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Labs | Learn Something New!',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'The best way to learn, is step by step. We introduce Labs, a place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!',
    });
  }

  getPopularTags() {
    this.labsService.pTags().subscribe(data => this.popularTags = data.tags.slice(0, 6));
  }

  getPopularLabs() {
    this.labsService.searchLabsByTags([]).subscribe(data => this.popularLabs = data.labs);
    // this.labsService.pIndex(tag).subscribe(data => this.popularLabs = data.labs);
  }

  getSearchedLabs() {
    this.labsHomeService.labSearch$.subscribe(value => {
      if (this.searchedTags.length !== 0) {
        this.searchedLabs = value;
      }
    });
  }

  onTagAdd(value: string) {
    if (!this.searchedTags.includes(value)) {
      this.searchedTags.push(value);
      this.labsHomeService.getLabSearchResults(this.searchedTags);
    }
  }

  onTagsUpdate(tags: string[]) {
    this.searchedTags = tags;
    if (this.searchedTags.length === 0) {
      this.searchedLabs = [];
    }
  }
}
