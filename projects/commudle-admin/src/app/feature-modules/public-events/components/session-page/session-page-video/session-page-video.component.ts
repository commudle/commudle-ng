import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
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
  @Input() chat: IDiscussion;
  @Input() qna: IDiscussion;
  @Input() pollableId: number;
  @Input() pollableType: string;

  moment = moment;
  EUserRoles = EUserRoles;

  isFullScreen = false;

  // For live notifications
  userCount = 0;
  newMessage = false;
  newQna = false;
  newPoll = false;

  @ViewChildren('window') windows: QueryList<ElementRef>;

  constructor(
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit(): void {
    console.log(this.embeddedVideoStream.source);
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
    switch (windowNum) {
      case 1:
        this.newMessage = false;
        break;
      case 2:
        this.newQna = false;
        break;
      case 3:
        this.newPoll = false;
        break;
    }
  }

}
