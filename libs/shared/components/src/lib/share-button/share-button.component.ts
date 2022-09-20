import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { NbButtonAppearance } from '@nebular/theme';
import { LibToastLogService } from '@commudle/shared-services';
import { NavigatorShareService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class ShareButtonComponent implements OnInit {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() url: string = '';

  // Fallback content
  @Input() content: string = '';

  @Input() showText: boolean = true;
  @Input() round: boolean = false;
  @Input() appearance: NbButtonAppearance = 'filled';
  @Input() fullWidth: boolean = false;

  constructor(
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {}

  copyTextToClipboard(): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(this.content)) {
        this.libToastLogService.successDialog('Copied the message successfully!');
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
