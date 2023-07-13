import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { ToastrService } from './toastr.service';

interface ShareObject {
  title: string;
  text: string;
  url: string;
  files?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  webNavigator: any = null;

  constructor(private clipboard: Clipboard, private toastrService: ToastrService) {
    this.webNavigator = window.navigator;
  }

  canShare(): boolean {
    return this.webNavigator !== null && this.webNavigator.share !== undefined;
  }

  canShareFile(file: []): boolean {
    return (
      this.webNavigator !== null && this.webNavigator.share !== undefined && this.webNavigator.canShare({ files: file })
    );
  }

  share({ title, text, url, files }: { title: string; text?: string; url?: string; files?: any[] }): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      if (this.webNavigator !== null && this.webNavigator.share !== undefined) {
        if ((text === undefined || text === null) && (url === undefined || url === null)) {
          console.warn(`text and url both can't be empty, at least provide either text or url`);
        } else {
          try {
            const shareObject: ShareObject = { title, text, url };
            if (files && files.length !== 0) {
              shareObject.files = files;
            }
            const isShared = await this.webNavigator.share(shareObject);
            resolve({ shared: true });
          } catch (error) {
            reject({ shared: false, error });
          }
        }
      } else {
        reject({ shared: false, error: `This service/api is not supported in your Browser` });
      }
    });
  }

  shareContent(
    clipboardContent: string = 'Share this content',
    title: string = 'Copied content',
    text: string = 'Share this content',
    url: string = 'https://commudle.com',
    clipboardMessage: string = 'Copied the content successfully!',
    shareMessage: string = 'Shared Successfully!',
  ): void {
    if (!this.canShare()) {
      if (this.clipboard.copy(clipboardContent)) {
        this.toastrService.successDialog(clipboardMessage);
        return;
      }
    }

    this.share({ title, text, url }).then(() => {
      this.toastrService.successDialog(shareMessage);
    });
  }
}
