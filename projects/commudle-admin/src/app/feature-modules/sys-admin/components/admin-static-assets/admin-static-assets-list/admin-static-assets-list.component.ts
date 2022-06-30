import { Component, OnInit } from '@angular/core';
import { IStaticAsset } from 'projects/shared-models/assets.model';
import { AdminStaticAssetsService } from '../../../services/admin-static-assets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-static-assets-list',
  templateUrl: './admin-static-assets-list.component.html',
  styleUrls: ['./admin-static-assets-list.component.scss'],
})
export class AdminStaticAssetsListComponent implements OnInit {
  constructor(private adminStaticAssetsService: AdminStaticAssetsService) {}
  assets: IStaticAsset[] = [];
  page = 1;
  count = 5;
  total = -1;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getAsset();
  }

  getAsset(): void {
    if (this.assets.length !== this.total) {
      this.subscriptions.push(
        this.adminStaticAssetsService.getAssets(this.page, this.count).subscribe((value) => {
          this.assets = this.assets.concat(value.static_assets);
          this.page = +value.page;
          this.total = +value.total;
          this.page += 1;
        }),
      );
    }
  }
}
