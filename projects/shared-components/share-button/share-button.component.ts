import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { NavigatorShareService } from 'projects/shared-services/navigator-share.service';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class ShareButtonComponent implements OnInit {
  //Windows
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() url: string = '';

  //General
  @Input() content: string = '';

  @Input() showText: boolean;
  @Input() round: boolean = false;

  constructor(
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {}

  copyTextToClipboard(): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(this.content)) {
        this.libToastLogService.successDialog('Copied link successfully!');
        return;
      }
    }

    this.navigatorShareService
      .share({
        title: this.title,
        text: this.text,
        url: this.url,
      })
      .then(() => {
        this.libToastLogService.successDialog('Shared Successfully!');
      });
  }
}
