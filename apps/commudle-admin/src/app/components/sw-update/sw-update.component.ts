import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NbToastrService } from '@nebular/theme';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-sw-update',
  templateUrl: './sw-update.component.html',
  styleUrls: ['./sw-update.component.scss']
})
export class SwUpdateComponent implements OnInit {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private updates: SwUpdate,
    private toastLogService: LibToastLogService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,


  ) { }

  ngOnInit() {
    if (this.isBrowser) {

      this.updates.available.subscribe(event => {
        this.toastLogService.warningDialog('Updating App...!');

        this.updates.activateUpdate().then(() => this.document.location.reload());
      });
    }
  }

}
