import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import moment from 'moment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-session-page-video',
  templateUrl: './session-page-video.component.html',
  styleUrls: ['./session-page-video.component.scss']
})
export class SessionPageVideoComponent implements OnInit {

  @Input() event: IEvent;
  @Input() userRoles: any[];
  @Input() currentUser: ICurrentUser;
  @Input() embeddedVideoStream: IEmbeddedVideoStream;
  @Input() startTime: Date;
  @Input() endTime: Date;

  moment = moment;
  EUserRoles = EUserRoles;

  isFullScreen = false;

  // For live notifications
  userCount = 0;

  @ViewChildren('window') windows: QueryList<ElementRef>;

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
    this.isFullScreen = !this.isFullScreen;
  }

  toggleWindow(windowNum: number): void {
    this.windows.forEach((item, index) => {
      item.nativeElement.style.display = windowNum === index ? item.nativeElement.style.display === 'block' ? 'none' : 'block' : 'none';
    });
  }

}
