import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { IQuestionTypes } from 'apps/shared-models/question_types.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): any {
    if (!this.apiRoutesService.getBaseUrl()) {
      this.apiRoutesService.setBaseUrl(environment.base_url);
    }
  }
}
