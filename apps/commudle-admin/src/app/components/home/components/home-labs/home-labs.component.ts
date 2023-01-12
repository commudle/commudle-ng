import {Component, OnInit} from '@angular/core';
import {ILab} from 'apps/shared-models/lab.model';
import {HomeService} from 'apps/commudle-admin/src/app/services/home.service';

@Component({
  selector: 'app-home-labs',
  templateUrl: './home-labs.component.html',
  styleUrls: ['./home-labs.component.scss']
})
export class HomeLabsComponent implements OnInit {

  labs: ILab[] = [];

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getLabs();
  }

  getLabs() {
    this.homeService.labs().subscribe(data => this.labs = data.labs);
  }

}
