import { environment } from 'projects/commudle-admin/src/environments/environment';
import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  Router} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LibErrorHandlerService } from 'projects/lib-error-handler/src/public-api';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Injectable()
export class RedirectToMyProfileGuard implements CanActivate {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: LibAuthwatchService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const subs = this.authService.currentUser$.subscribe(
      data => {
        if (data && data.username) {
          this.router.navigate(['/users', data.username]);
          subs.unsubscribe();
        }
      }
    )

    return true;
  }

}
