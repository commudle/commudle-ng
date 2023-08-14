import { Component, Input, OnInit } from '@angular/core';
import { AuthService, YoutubeLoginProvider } from '@commudle/auth';
import { ICommunityAuthToken } from '@commudle/shared-models';
import { ToastrService } from '@commudle/shared-services';
import { CommunityAuthTokensService } from 'apps/commudle-admin/src/app/services/community-auth-tokens.service';
import { IEmbeddedVideoStream } from 'apps/shared-models/embedded_video_stream.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-event-streaming',
  templateUrl: './event-streaming.component.html',
  styleUrls: ['./event-streaming.component.scss'],
})
export class EventStreamingComponent implements OnInit {
  @Input() embeddedVideoStream: IEmbeddedVideoStream;

  communityAuthToken: ICommunityAuthToken;

  subscriptions: Subscription[] = [];

  constructor(
    // TODO: Remove google login popup
    private authService: AuthService,
    private communityAuthTokensService: CommunityAuthTokensService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    this.subscriptions.push(
      this.communityAuthTokensService.getToken(this.embeddedVideoStream.id, 'youtube').subscribe((res) => {
        if (res) {
          this.communityAuthToken = res;
        }
      }),
    );
  }

  createToken(authorization_code: string) {
    this.subscriptions.push(
      this.communityAuthTokensService
        .createToken({ parent_id: this.embeddedVideoStream.id, token_type: 'youtube', authorization_code })
        .subscribe((res) => {
          if (res) {
            this.toastrService.successDialog('Connected to Youtube');
            this.getToken();
          }
        }),
    );
  }

  loginToYoutube() {
    this.authService.getAccessToken(YoutubeLoginProvider.PROVIDER_ID).then((authorization_code) => {
      this.createToken(authorization_code);
    });
  }

  logoutFromYoutube() {
    this.subscriptions.push(
      this.communityAuthTokensService.deleteToken(this.embeddedVideoStream.id, 'youtube').subscribe((res) => {
        if (res) {
          this.toastrService.successDialog('Disconnected from Youtube');
        }
      }),
    );
  }
}
