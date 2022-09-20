import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '@commudle/shared-models';
import {HomeService} from 'apps/commudle-admin/src/app/services/home.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'commudle-home-experts',
  templateUrl: './home-experts.component.html',
  styleUrls: ['./home-experts.component.scss']
})
export class HomeExpertsComponent implements OnInit, OnDestroy {

  experts: IUser[] = [];

  subscription: Subscription;

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getExperts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getExperts() {
    this.subscription = this.homeService.experts().subscribe(value => this.experts = value);
  }

}
