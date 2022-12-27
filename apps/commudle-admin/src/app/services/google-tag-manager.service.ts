import { Injectable } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  constructor(private seoService: SeoService) {}

  dataLayerPushEvent(event: string, data: any) {
    data.event = event;
    if (!this.seoService.isBot) {
      window.dataLayer.push(data);
    }
  }
}
