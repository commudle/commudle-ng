import { Component, OnInit } from '@angular/core';
import { static_assets } from 'projects/shared-models/assets.model';
import { AdminStaticAssetsService } from '../../../services/admin-static-assets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-static-assets-list',
  templateUrl: './admin-static-assets-list.component.html',
  styleUrls: ['./admin-static-assets-list.component.scss'],
})
export class AdminStaticAssetsListComponent implements OnInit {
  // AdminStaticAssetsService: any;
  constructor(private adminStaticAssetsService: AdminStaticAssetsService) {}
  // assets!: assets;
  assets: static_assets[] = [];
  page = 1;
  count = 5;
  total = -1;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getAsset();
    // this.assets = this.adminStaticAssetsService.getAsset();
  }
  getAsset(): void {
    // this.assets = this.adminStaticAssetsService.getAsset();
    // this.subscriptions.push(
    //   this.adminStaticAssetsService.getAsset().subscribe((value) => {
    //     this.assets = this.assets.concat(value);
    //   }),
    // );
    if (this.assets.length !== this.total) {
      this.subscriptions.push(
        this.adminStaticAssetsService.getAsset(this.page, this.count).subscribe((value) => {
          this.assets = this.assets.concat(value.static_assets);
          this.page = +value.page;
          this.total = +value.total;
          this.page += 1;
        }),
      );
    }
  }
}
