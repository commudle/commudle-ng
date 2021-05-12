import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-network-list',
  templateUrl: './user-network-list.component.html',
  styleUrls: ['./user-network-list.component.scss']
})
export class UserNetworkListComponent implements OnInit {

  network: any[];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.checkNetworkType();
  }

  checkNetworkType(): void {
    // @ts-ignore
    const type = this.activatedRoute.url._value[0].path;
    type === 'followers' ? this.getFollowers() : this.getFollowing();
  }

  getFollowers(): void {
    console.log('get followers');
  }

  getFollowing(): void {
    console.log('get following');
  }

}
