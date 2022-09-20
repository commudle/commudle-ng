import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-sys-admin',
  templateUrl: './sys-admin.component.html',
  styleUrls: ['./sys-admin.component.scss'],
})
export class SysAdminComponent implements OnInit, OnDestroy {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }
}
