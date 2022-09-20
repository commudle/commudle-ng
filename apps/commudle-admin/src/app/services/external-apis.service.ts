import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES, ApiRoutesService, LibAuthwatchService } from '@commudle/shared-services';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root',
})
export class ExternalApisService {
  constructor(
    private apiRoutesService: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private http: HttpClient,
  ) {}

  githubRepoData(): Observable<any> {
    return this.http.get<any>(API_ROUTES.EXTERNAL.GITHUB_API);
  }
}
