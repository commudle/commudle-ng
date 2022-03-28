import { HMSLogLevel } from '@100mslive/hms-video';
import { selectIsConnectedToRoom } from '@100mslive/hms-video-store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Component({
  selector: 'app-hms-beam',
  templateUrl: './hms-beam.component.html',
  styleUrls: ['./hms-beam.component.scss'],
  providers: [IsBrowserService],
})
export class HmsBeamComponent implements OnInit {
  authToken: string;

  isBrowser: boolean = this.isBrowserService.isBrowser();

  constructor(
    private activatedRoute: ActivatedRoute,
    private isBrowserService: IsBrowserService,
    private footerService: FooterService,
  ) {}

  ngOnInit(): void {
    hmsActions.setLogLevel(HMSLogLevel.VERBOSE);

    if (!this.isBrowser) {
      return;
    }

    this.activatedRoute.queryParams.subscribe((value: Params) => {
      this.authToken = value.authToken;

      this.joinRoom();
    });

    this.footerService.changeFooterStatus(false);
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
