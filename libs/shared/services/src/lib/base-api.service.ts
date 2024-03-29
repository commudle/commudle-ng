import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  // this baseUrl needs to be set from the app which is calling this service when the app loads in the app component itself
  private baseApiUrl!: string;

  constructor() {}

  setBaseUrl(envBase: string): string {
    return (this.baseApiUrl = envBase);
  }

  getBaseUrl(): string {
    return this.baseApiUrl;
  }

  getRoute(routeValue: string): string {
    return `${this.baseApiUrl}/${routeValue}`;
  }
}
