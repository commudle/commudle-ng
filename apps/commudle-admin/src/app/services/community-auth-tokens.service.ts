import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommunityAuthToken } from '@commudle/shared-models';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';

@Injectable({
  providedIn: 'root',
})
export class CommunityAuthTokensService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getToken(parentId: number, tokenType: string) {
    const params = new HttpParams().set('parent_id', String(parentId)).set('token_type', tokenType);
    return this.http.get<ICommunityAuthToken>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_AUTH_TOKENS.INDEX), {
      params,
    });
  }

  createToken(data: Partial<ICommunityAuthToken>) {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_AUTH_TOKENS.CREATE), {
      community_auth_token: data,
    });
  }

  deleteToken(parentId: number, tokenType: string) {
    const params = new HttpParams().set('parent_id', String(parentId)).set('token_type', tokenType);
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_AUTH_TOKENS.DELETE), { params });
  }
}
