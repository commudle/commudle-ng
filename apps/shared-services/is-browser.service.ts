import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class IsBrowserService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private activatedRoute: ActivatedRoute) {}

  isBrowser() {
    // check if query param has bot=true
    const bot = this.activatedRoute.snapshot.queryParams['bot'];
    if (bot) {
      return false;
    }

    return isPlatformBrowser(this.platformId);
  }
}
