import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EEmbeddedVideoStreamSources } from 'projects/shared-models/enums/embedded_video_stream_sources.enum';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit, OnChanges {
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;

  @Input() videoSource: string;
  @Input() videoCode: any;
  @Input() fillerText: string;
  @Input() width: number;
  @Input() height: number;

  playerUrl: any;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.setPreview();
  }

  ngOnChanges(): void {
    this.setPreview();
  }

  setPreview() {
    if (this.videoCode) {
      switch (this.videoSource) {
        case EEmbeddedVideoStreamSources.YOUTUBE:
          this.youtubeParser();
          break;
        case EEmbeddedVideoStreamSources.JITSI_MEET:
          this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoCode);
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

}
