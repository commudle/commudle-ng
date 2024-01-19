import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-experts-featured',
  templateUrl: './experts-featured.component.html',
  styleUrls: ['./experts-featured.component.scss'],
})
export class ExpertsFeaturedComponent implements OnInit {
  experts: IUser[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getExperts();
  }

  getExperts() {
    this.homeService.experts().subscribe((value) => {
      this.experts = value;
    });
  }
}
