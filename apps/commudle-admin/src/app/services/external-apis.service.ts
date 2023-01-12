import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { environment } from '../../environments/environment';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExternalApisService {

  constructor(
    private apiRoutesService: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private http: HttpClient
  ) { }

  githubRepoData(): Observable<any> {
    return this.http.get<any>(
      API_ROUTES.EXTERNAL.GITHUB_API
    );
  }

}
