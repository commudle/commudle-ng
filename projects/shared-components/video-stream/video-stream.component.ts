import { environment } from 'projects/commudle-admin/src/environments/environment';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { EEmbeddedVideoStreamSources } from 'projects/shared-models/enums/embedded_video_stream_sources.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit, OnChanges {
  isBrowser: boolean = isPlatformBrowser(this.platformId);
  @ViewChild('jitsimeet', {static: false}) private jitsiMeet: ElementRef;
  api;

  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;
  environment = environment;
  @Input() currentUser: ICurrentUser;
  @Input() videoSource: string;
  @Input() videoCode: any;
  @Input() fillerText: string;
  @Input() width: number;
  @Input() height: number;

  @Input() userEmail: string;
  @Input() userName: string;

  // zoom specific attributes
  @Input() zoomSignature: string;
  @Input() zoomHostEmail: string;
  @Input() zoomPassword: string;
  @Input() zoomHostSignature: string;

  // hms specific attributes
  @Input() hmsRoomId: string;

  playerUrl: any;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) { }

  ngOnInit() {
    this.setPreview();
    if (!this.fillerText) {
      this.fillerText = 'Loading...';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
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
        case EEmbeddedVideoStreamSources.JITSI_MEET:
          this.playerUrl = this.videoCode;
          this.initJitsi();
          break;
        case EEmbeddedVideoStreamSources.ZOOM:
          this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createZoomUrl());
          break;
        case EEmbeddedVideoStreamSources.EXTERNAL_LINK:
          this.playerUrl = this.videoCode;
          break;
        default: // for other embeds
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
    this.playerUrl = (val && val[7].length === 11) ? val[7] : '';
  }

  initJitsi() {

    this.changeDetectorRef.detectChanges();
    const domJitsi = this.jitsiMeet.nativeElement as HTMLElement;
    const domain = 'meet.jit.si';
    const options = {
        roomName: this.playerUrl,
        width: this.width || 640,
        height: this.height || 480,
        parentNode: domJitsi,
        configOverwrite: { startWithAudioMuted: true },
    };

    if (this.api) {
      this.api.dispose();
    }
    this.api = new JitsiMeetExternalAPI(domain, options);
  }


  createZoomUrl() {
    return encodeURI(`${environment.zoom_call_server_url}?email=${this.userEmail}&meeting_number=${this.videoCode}&name=${this.userName}&signature=${this.zoomSignature}&host_email=${this.zoomHostEmail}&host_signature=${this.zoomHostSignature}&password=${this.zoomPassword}`);

  }

}
