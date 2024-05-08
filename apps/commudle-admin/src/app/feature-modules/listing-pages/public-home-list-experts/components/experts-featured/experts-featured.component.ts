import { Component, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-experts-featured',
  templateUrl: './experts-featured.component.html',
  styleUrls: ['./experts-featured.component.scss'],
})
export class ExpertsFeaturedComponent implements OnInit {
  experts: IFeaturedItems[] = [];
  showSpinner = true;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.getFeaturedExperts();
  }

  getFeaturedExperts() {
    this.featuredItemsService.getFeaturedItems('User', 'experts').subscribe((data) => {
      this.experts = this.experts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      // console.log(data);
      // console.log(this.experts);
      this.showSpinner = false;
    });
  }
}
