import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EAttachmentType } from '@commudle/shared-models';

@Component({
  selector: 'commudle-speaker-slides-card',
  templateUrl: './speaker-slides-card.component.html',
  styleUrls: ['./speaker-slides-card.component.scss'],
})
export class SpeakerSlidesCardComponent implements OnInit {
  @Input() item: any;

  iframe;
  EAttachmentType = EAttachmentType;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.item.embedded_content) {
      this.iframe = this.domSanitizer.bypassSecurityTrustHtml(this.item.embedded_content);
      console.log(this.iframe);
    }
    console.log(this.item);
  }
}
