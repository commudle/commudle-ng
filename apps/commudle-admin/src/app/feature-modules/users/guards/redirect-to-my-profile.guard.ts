import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Injectable()
export class RedirectToMyProfileGuard implements CanActivate {
  constructor(private authService: LibAuthwatchService, private router: Router) {}

  canActivate(): boolean {
    const subs = this.authService.currentUser$.subscribe((data) => {
      if (data?.username) {
        this.router.navigate(['/users', data.username]).then(() => subs.unsubscribe());
      }
    });

    return true;
  }
}
