import { Component, OnInit } from '@angular/core';
import { ILab } from '@commudle/shared-models';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'commudle-home-labs',
  templateUrl: './home-labs.component.html',
  styleUrls: ['./home-labs.component.scss'],
})
export class HomeLabsComponent implements OnInit {
  labs: ILab[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getLabs();
  }

  getLabs() {
    this.homeService.labs().subscribe((data) => (this.labs = data.labs));
  }
}
