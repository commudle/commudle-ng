import {Component, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import moment from 'moment';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {IEmbeddedVideoStream} from 'projects/shared-models/embedded_video_stream.model';

@Component({
  selector: 'app-session-page-video',
  templateUrl: './session-page-video.component.html',
  styleUrls: ['./session-page-video.component.scss']
})
export class SessionPageVideoComponent implements OnInit {

  @Input() currentUser: ICurrentUser;
  @Input() embeddedVideoStream: IEmbeddedVideoStream;
  @Input() startTime: Date;

  moment = moment;

  isFullScreen = false;

  constructor(
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit(): void {
  }

  toggleFullScreen(): void {
    if (this.isFullScreen) {
      this.document.exitFullscreen();
    } else {
      this.document.documentElement.requestFullscreen();
    }
    this.isFullScreen = !this.isFullScreen
  }

}
