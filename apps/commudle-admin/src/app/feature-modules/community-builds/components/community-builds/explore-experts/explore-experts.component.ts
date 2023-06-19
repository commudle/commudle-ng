import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { IUser } from 'apps/shared-models/user.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-explore-experts',
  templateUrl: './explore-experts.component.html',
  styleUrls: ['./explore-experts.component.scss'],
})
export class ExploreExpertsComponent implements OnInit {
  experts: IUser[] = [];
  showSpinner = true;
  staticAssets = staticAssets;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getExperts();
  }

  getExperts() {
    this.homeService.experts().subscribe((value) => {
      this.experts = value;
      this.showSpinner = false;
    });
  }
}
