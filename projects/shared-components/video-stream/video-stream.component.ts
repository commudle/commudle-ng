import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { EEmbeddedVideoStreamSources } from 'projects/shared-models/enums/embedded_video_stream_sources.enum';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss'],
  providers: [IsBrowserService],
})
export class VideoStreamComponent implements OnInit, OnChanges {
  @Input() started: boolean;
  @Input() currentUser: ICurrentUser;
  @Input() fillerText: string = 'Loading...';
  @Input() videoSource: string;
  @Input() videoCode: any;
  @Input() width: number;
  @Input() height: number;
  @Input() embeddedVideoStream: IEmbeddedVideoStream;

  @Output() beamStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  playerUrl: any;

  environment = environment;
  isBrowser: boolean = this.isBrowserService.isBrowser();
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private isBrowserService: IsBrowserService,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentUser || changes.embeddedVideoStream || changes.videoCode || changes.videoSource) {
      if (this.currentUser && this.embeddedVideoStream && this.videoCode && this.videoSource) {
        this.setPreview();
      }
    }
  }

  setPreview() {
    if (this.videoCode) {
      switch (this.videoSource) {
        case EEmbeddedVideoStreamSources.COMMUDLE:
          this.changeDetectorRef.detectChanges();
          break;
        case EEmbeddedVideoStreamSources.YOUTUBE:
          this.youtubeParser();
          break;
        case EEmbeddedVideoStreamSources.ZOOM:
          this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createZoomUrl());
          break;
        case EEmbeddedVideoStreamSources.EXTERNAL_LINK:
          this.playerUrl = this.videoCode;
          break;
        default:
          // for other embeds
          this.playerUrl = this.sanitizer.bypassSecurityTrustHtml(this.videoCode);
          break;
      }
    } else {
      this.playerUrl = undefined;
    }
  }

  youtubeParser() {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const val = this.videoCode.match(regExp);
    this.playerUrl = val && val[7].length === 11 ? val[7] : '';
  }

  createZoomUrl() {
    return encodeURI(
      `${environment.zoom_call_server_url}?email=${this.currentUser.email}&meeting_number=${this.videoCode}&name=${this.currentUser.name}&signature=${this.embeddedVideoStream.zoom_host_signature}&host_email=${this.embeddedVideoStream.zoom_host_email}&host_signature=${this.embeddedVideoStream.zoom_host_signature}&password=${this.embeddedVideoStream.zoom_password}`,
    );
  }
}
