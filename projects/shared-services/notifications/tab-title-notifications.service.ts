import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TabTitleNotificationsService{
  private defaultTitle: string;
  private interval: NodeJS.Timeout;

  constructor(private title: Title) {}

  blinkTitle(value: string): void {
    window.onblur = () => this.enableNotification(value);
    window.onfocus = () => this.disableNotification();
  }

  enableNotification(text: string, interval: number = 3000): void {
    if (!this.interval) {
      this.defaultTitle = this.title.getTitle();
      this.interval = setInterval(() => {
        this.title.setTitle(this.defaultTitle === this.title.getTitle() ? text : this.defaultTitle);
      }, interval);
    }
  }

  disableNotification(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.title.setTitle(this.defaultTitle);
    }
  }
}
