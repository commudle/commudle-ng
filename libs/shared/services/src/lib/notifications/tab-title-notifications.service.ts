import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TabTitleNotificationsService {
  private defaultTitle: string;
  private interval;
  private newTitle = '';

  constructor(private title: Title) {}

  blinkTitle(value: string): void {
    // if (document.hasFocus()) {
    //   return;
    // }
    //
    // this.newTitle = value;
    // window.onblur = () => this.enableNotification();
    // window.onfocus = () => this.disableNotification();
  }

  enableNotification(interval: number = 3000): void {
    if (this.interval || this.newTitle === '') {
      return;
    }

    this.defaultTitle = this.title.getTitle();
    this.interval = setInterval(() => {
      this.title.setTitle(this.defaultTitle === this.title.getTitle() ? this.newTitle : this.defaultTitle);
    }, interval);
  }

  disableNotification(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.newTitle = '';
      this.title.setTitle(this.defaultTitle);
    }
  }
}
