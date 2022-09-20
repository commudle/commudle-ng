import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from '@commudle/shared-environments';
import { ApiRoutesService } from '@commudle/shared-services';

@Injectable({
  providedIn: 'root',
})
export class InitResolver implements Resolve<any> {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): any {
    if (!this.apiRoutesService.getBaseUrl()) {
      this.apiRoutesService.setBaseUrl(environment.base_url);
    }
  }
}
