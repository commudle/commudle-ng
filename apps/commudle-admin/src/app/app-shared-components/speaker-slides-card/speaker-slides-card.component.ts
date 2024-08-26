import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EAttachmentType, ISpeakerResource } from '@commudle/shared-models';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-speaker-slides-card',
  templateUrl: './speaker-slides-card.component.html',
  styleUrls: ['./speaker-slides-card.component.scss'],
})
export class SpeakerSlidesCardComponent implements OnInit {
  @Input() item: ISpeakerResource;

  iframe: SafeHtml;
  EAttachmentType = EAttachmentType;
  staticAssets = staticAssets;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.item.attachment_type === EAttachmentType.EMBEDDED_LINK) {
      if (this.item.embedded_content.includes('<iframe')) {
        this.iframe = this.domSanitizer.bypassSecurityTrustHtml(this.item.embedded_content);
      } else {
        const iframeHtml = `<iframe src="${this.item.embedded_content}" frameborder="0" width="100%" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
        this.iframe = this.domSanitizer.bypassSecurityTrustHtml(iframeHtml);
      }
    }
  }
}
