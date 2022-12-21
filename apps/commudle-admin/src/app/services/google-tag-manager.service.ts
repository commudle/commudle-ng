import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  constructor() {}

  dataLayerPushEvent(event: string, data: any) {
    data.event = event;
    window.dataLayer.push(data);
  }
}
