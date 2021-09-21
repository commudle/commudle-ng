import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PioneerAnalyticsService {
  pioneerAnalytics: any;

  constructor(private router: Router) {
  }

  // Call the active() method whenever the current user performs an action that makes them an active user
  trackAction(): void {
    if (window.location.hostname !== 'localhost') {
      this.pioneerAnalytics.active();
    }
  }

  startAnalytics(userId: number): void {
    if (window.location.hostname !== 'localhost') {
      // @ts-ignore
      this.pioneerAnalytics = window.pioneerAnalytics;

      this.identifyUser(userId);

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.trackPage();
          this.trackAction();
        }
      });
    }
  }

  // Make an identify() call on every page load for logged-in users. identify() tells us who the current user is
  private identifyUser(userId: number): void {
    this.pioneerAnalytics.identify(userId);
  }

  // Correctly tracking page views in single-page applications (SPAs)
  private trackPage(): void {
    this.pioneerAnalytics.page();
  }
}
