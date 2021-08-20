import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { hmsActions } from 'projects/shared-modules/hms-video/stores/hms.store';
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
  }
}
