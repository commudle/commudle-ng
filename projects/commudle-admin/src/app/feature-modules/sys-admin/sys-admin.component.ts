import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sys-admin',
  templateUrl: './sys-admin.component.html',
  styleUrls: ['./sys-admin.component.scss']
})
export class SysAdminComponent implements OnInit, OnDestroy {

  constructor(
    private meta: Meta
  ) { }

  ngOnInit() {
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
  }

}
