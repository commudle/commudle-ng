import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild } from '@angular/router';
import { LibAuthwatchService } from './lib-authwatch.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: LibAuthwatchService) {}


  isLoggedIn(): boolean {
    this.authService.currentUserVerified$.subscribe(verified => {
      if (verified === false) {
        // if the user is not logged in then redirect to the login screen
        this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
        return false;
      }
    });
    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.isLoggedIn();
  }


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('canactivatechild called');

    return this.canActivate(route, state);
  }


  // canLoad(route: Route): boolean {

  //   return this.isLoggedIn();
  // }
}
