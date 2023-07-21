import { Component, Input, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
// import { ILab } from 'apps/shared-models/lab.model';
// import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'app-labs-header',
  templateUrl: './labs-header.component.html',
  styleUrls: ['./labs-header.component.scss'],
})
export class LabsHeaderComponent implements OnInit {
  labsPageHeader: IListingPageHeader;
  richText: string;
  faFlask = faFlask;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('builds').subscribe((data) => {
      this.labsPageHeader = data;
      this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }
}
// @Input() tags: string[] = [];
// @Input() labs: ILab[] = [];

// staticAssets = staticAssets;

// trending = [];
// // trending = [
// //   {
// //     name: 'Game theory using Regression',
// //     image: '',
// //     description: '',
// //     type: 'Upcoming Event',
// //     stats: {
// //       icon: 'trending-up',
// //       text: '200 going'
// //     }
// //   },
// //   {
// //     name: 'Game theory using Regression',
// //     image: '',
// //     description: '',
// //     type: 'New Lab',
// //     stats: {
// //       icon: 'eye',
// //       text: '200 views'
// //     }
// //   },
// //   {
// //     name: 'This is CSS Week!',
// //     image: 'https://via.placeholder.com/100',
// //     description: 'Write a lab and we will get it reviewed by "expert-name". If published, you win a T Shirt!',
// //     type: '',
// //     stats: {
// //       icon: 'flash',
// //       text: '20 left'
// //     }
// //   },
// //   {
// //     name: '',
// //     image: '',
// //     description: 'What\'s the one new thing in software development you learnt in the last month, write a lab and win a TShirt!',
// //     type: 'New Goodies',
// //     stats: {
// //       icon: '',
// //       text: ''
// //     }
// //   },
// // ];

// getVisits(): number {
//   return this.labs.reduce((acc: 0, lab: ILab) => acc + lab.visits, 0);
// }
