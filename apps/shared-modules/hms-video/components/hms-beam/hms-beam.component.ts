import { HMSLogLevel, selectIsConnectedToRoom } from '@100mslive/hms-video-store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { hmsActions, hmsStore } from 'apps/shared-modules/hms-video/stores/hms.store';
import { IsBrowserService } from 'apps/shared-services/is-browser.service';
import { WhatsNewService } from 'apps/shared-services/whats-new.service';

@Component({
  selector: 'app-hms-beam',
  templateUrl: './hms-beam.component.html',
  styleUrls: ['./hms-beam.component.scss'],
  providers: [IsBrowserService],
})
export class HmsBeamComponent implements OnInit {
  authToken: string;

  isBrowser: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private isBrowserService: IsBrowserService,
    private whatsNewService: WhatsNewService,
  ) {
    this.isBrowser = this.isBrowserService.isBrowser();
  }

  ngOnInit(): void {
    this.whatsNewService.hideWhatsNewPopup();
    hmsActions.setLogLevel(HMSLogLevel.VERBOSE);

    if (!this.isBrowser) {
      return;
    }

    this.activatedRoute.queryParams.subscribe((value: Params) => {
      this.authToken = value.authToken;

      this.joinRoom();
    });
  }

  joinRoom(): void {
    hmsActions.join({
      authToken: this.authToken,
      userName: 'commudle-beam',
    });

    hmsStore.subscribe((value: boolean) => {
      if (value) {
        hmsActions.unblockAudio();
      }
    }, selectIsConnectedToRoom);
  }
}
