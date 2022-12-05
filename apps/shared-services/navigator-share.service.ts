import { Injectable } from '@angular/core';

interface ShareObject {
  title: string;
  text: string;
  url: string;
  files?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class NavigatorShareService {
  webNavigator: any = null;

  constructor() {
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
}
