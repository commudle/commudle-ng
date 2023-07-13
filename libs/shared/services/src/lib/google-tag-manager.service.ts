import { Injectable } from '@angular/core';
import { SeoService } from './seo.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  host: string;

  constructor(private seoService: SeoService) {
    this.host = window.location.hostname;
  }

  dataLayerPushEvent(event: string, data: any) {
    data.event = event;
    if (!this.seoService.isBot && !['localhost', 'test.commudle.com'].includes(this.host)) {
      window.dataLayer.push(data);
    }
  }
}
