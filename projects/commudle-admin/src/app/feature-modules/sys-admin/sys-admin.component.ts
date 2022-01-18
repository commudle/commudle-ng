import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-sys-admin',
  templateUrl: './sys-admin.component.html',
  styleUrls: ['./sys-admin.component.scss']
})
export class SysAdminComponent implements OnInit, OnDestroy {

  constructor(
    private seoService : SeoService
  ) { }

  ngOnInit() {
    this.seoService.setTag('robots', 'noindex');
  }

  ngOnDestroy() {
    this.seoService.removeTag("name='robots'");
  }

}
