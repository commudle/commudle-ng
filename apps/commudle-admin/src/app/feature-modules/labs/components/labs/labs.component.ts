import { Component, OnInit } from '@angular/core';
import { LabsService } from 'apps/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { ILab } from '@commudle/shared-models';
import { ILabs } from '@commudle/shared-models';
import { ITag } from '@commudle/shared-models';
import { ITags } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent implements OnInit {
  page = 1;
  count = 9;
  total = -1;

  popularTags: ITag[] = [];
  popularLabs: ILab[] = [];

  searchedTags: string[] = [];
  searchedLabs: ILab[] = [];

  isLoading = false;

  constructor(private labsService: LabsService, private seoService: SeoService) {}

  ngOnInit() {
    this.getPopularTags();
    this.getLabsByTags();

    this.seoService.setTags(
      'Create Your Codelabs | Guided Tutorials From Software Developers',
      'Labs are guided hands-on tutorials published by software developers. They teach you algorithms, help you create  apps & projects and cover topics including Web, Flutter, Android, iOS, Data Structures, ML & AI.',
      `https://commudle.com/assets/images/commudle-logo192.png`,
    );
  }

  getPopularTags() {
    this.labsService.pTags().subscribe((data: ITags) => (this.popularTags = data.tags.slice(0, 6)));
  }

  onTagAdd(value: string) {
    if (!this.searchedTags.includes(value)) {
      this.searchedTags.push(value);
      this.total = -1;
      this.page = 1;
      this.count = 9;
      this.getLabsByTags(true);
    }
  }

  onTagsUpdate(tags: string[]) {
    this.searchedTags = tags || [];
    this.total = -1;
    this.page = 1;
    this.count = 9;
    this.getLabsByTags(true);
  }

  getLabsByTags(replace: boolean = false): void {
    this.isLoading = true;
    this.labsService.searchLabsByTags(this.searchedTags, this.page, this.count).subscribe((value: ILabs) => {
      this.searchedLabs = replace ? value.labs : this.searchedLabs.concat(value.labs);
      this.total = value.total;
      this.count = value.count;
      this.page++;
      this.isLoading = false;
    });
  }
}
