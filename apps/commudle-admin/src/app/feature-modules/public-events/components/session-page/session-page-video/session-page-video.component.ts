import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import * as moment from 'moment';
import { ICommunity } from '@commudle/shared-models';
import { ICurrentUser } from '@commudle/shared-models';
import { IDiscussion } from '@commudle/shared-models';
import { IEmbeddedVideoStream } from '@commudle/shared-models';
import { EUserRoles } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { ITrackSlot } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-session-page-video',
  templateUrl: './session-page-video.component.html',
  styleUrls: ['./session-page-video.component.scss'],
})
export class SessionPageVideoComponent implements OnInit, OnChanges, AfterViewInit {
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
  @Input() community: ICommunity;
  @Input() trackSlot: ITrackSlot;
  @Input() speaker: IUser;

  moment = moment;
  EUserRoles = EUserRoles;

  isFullScreen = false;
  compressVideoStream = false;
  isBeamActive = false;

  // For live notifications
  userCount = 0;
  newMessage = false;
  newQna = false;
  newPoll = false;

  @ViewChildren('interactionWindow') interactionWindows: QueryList<ElementRef>;

  constructor(@Inject(DOCUMENT) private document: any, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    document.onfullscreenchange = () => (this.isFullScreen = this.document.fullscreenElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.embeddedVideoStream) {
      this.isBeamActive = this.embeddedVideoStream.is_recording || this.embeddedVideoStream.is_streaming;
    }
  }

  ngAfterViewInit(): void {
    if (['commudle', 'youtube'].includes(this.embeddedVideoStream.source)) {
      this.toggleInteractionWindow(0);
      this.cdr.detectChanges();
    }
  }

  toggleFullScreen(): void {
    if (this.isFullScreen) {
      this.document.exitFullscreen();
    } else {
      this.document.documentElement.requestFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  toggleInteractionWindow(windowNum: number): void {
    this.interactionWindows.forEach((item: ElementRef, index: number) => {
      item.nativeElement.style.display =
        windowNum === index ? (item.nativeElement.style.display === 'block' ? 'none' : 'block') : 'none';
    });
    this.compressVideoStream = this.interactionWindows.some(
      (value: ElementRef) => value.nativeElement.style.display === 'block',
    );
    switch (windowNum) {
      case 2:
        this.newMessage = false;
        break;
      case 3:
        this.newQna = false;
        break;
      case 4:
        this.newPoll = false;
        break;
    }
  }

  getInteractionWindowStatus(windowNum: number): boolean {
    return this.interactionWindows.toArray()[windowNum].nativeElement.style.display === 'none';
  }
}
