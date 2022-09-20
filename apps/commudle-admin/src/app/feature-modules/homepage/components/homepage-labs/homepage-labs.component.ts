import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { ILab } from '@commudle/shared-models';

@Component({
  selector: 'commudle-homepage-labs',
  templateUrl: './homepage-labs.component.html',
  styleUrls: ['./homepage-labs.component.scss'],
})
export class HomepageLabsComponent implements OnInit {
  labs: ILab[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getLabs();
  }

  getLabs() {
    this.homeService.labs().subscribe((data) => (this.labs = data.labs));
  }
}
