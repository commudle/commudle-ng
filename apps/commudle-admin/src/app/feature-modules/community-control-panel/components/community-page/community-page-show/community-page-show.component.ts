import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-page-show',
  templateUrl: './community-page-show.component.html',
  styleUrls: ['./community-page-show.component.scss'],
})
export class CommunityPageShowComponent implements OnInit {
  subscription: Subscription[] = [];
  page: ICustomPage;
  constructor(private activatedRoute: ActivatedRoute, private customPageService: CustomPageService) {}

  ngOnInit() {
    this.getCustomPage();
  }

  getCustomPage() {
    this.subscription.push(
      this.customPageService.getShow(this.activatedRoute.snapshot.params.page_slug).subscribe((data) => {
        this.page = data;
      }),
    );
  }
}
