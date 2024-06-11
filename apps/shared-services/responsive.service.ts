import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  constructor() {}

  isMobileView(): boolean {
    return window.innerWidth <= 640;
  }
}
