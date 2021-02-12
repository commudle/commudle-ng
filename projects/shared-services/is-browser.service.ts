import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class IsBrowserService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
