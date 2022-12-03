import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Injectable()
export class RedirectToMyProfileGuard implements CanActivate {
  constructor(private authService: LibAuthwatchService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const subs = this.authService.currentUser$.subscribe((data) => {
      if (data?.username) {
        this.router
          .navigate(['/users', data.username], { queryParams: route.queryParams })
          .then(() => subs.unsubscribe());
      }
    });

    return true;
  }
}
