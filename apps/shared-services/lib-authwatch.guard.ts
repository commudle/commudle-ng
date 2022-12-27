import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/public-api';
import { LibAuthwatchService } from './lib-authwatch.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: LibErrorHandlerService,
  ) {}

  isLoggedIn(next, state): boolean {
    this.authService.currentUserVerified$.subscribe((verified) => {
      if (verified === false) {
        // if the user is not logged in then redirect to the login screen
        this.router.navigate(['/login'], { queryParams: { redirect: state.url } });
        return false;
      }

      // check for user roles
      if (verified && this.activatedRoute.snapshot.data.expectedRoles) {
        this.authService.currentUser$.subscribe((currentUser) => {
          const matchingRoles = currentUser.user_roles.filter(
            (value) => -1 !== this.activatedRoute.snapshot.data.expectedRoles.indexOf(value),
          );
          if (matchingRoles.length === 0) {
            this.errorHandlerService.handleError(403, 'Unauthorized');
          }
        });
      }

      // if (verified) {
      //   this.router.navigate([this.activatedRoute.snapshot.queryParams.return || '/']);
      // }
    });
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn(next, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
