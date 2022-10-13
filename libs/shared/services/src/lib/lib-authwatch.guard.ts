import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from '@commudle/shared-environments';
import { ErrorHandlerService } from './error-handler.service';
import { LibAuthwatchService } from './lib-authwatch.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  isLoggedIn(next, state): boolean {
    this.authService.currentUserVerified$.subscribe((verified) => {
      if (verified === false) {
        // if the user is not logged in then redirect to the login screen
        this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(
          environment.app_url + state.url,
        )}`;
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
    });
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn(next, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // canLoad(route: Route): boolean {

  //   return this.isLoggedIn();
  // }
}
