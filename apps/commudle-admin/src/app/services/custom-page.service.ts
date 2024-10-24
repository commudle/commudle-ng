import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { EDbModels } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class CustomPageService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createNewCustomPage(dataForm, parentId, parentType: EDbModels): Observable<ICustomPage> {
    let params = new HttpParams();
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.post<ICustomPage>(
      this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.CREATE),
      {
        custom_page: dataForm,
      },
      { params },
    );
  }

  getIndex(parentId: number | string, parentType: EDbModels): Observable<ICustomPage[]> {
    let params = new HttpParams();
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<ICustomPage[]>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.INDEX), { params });
  }

  update(dataForm, customPageId): Observable<ICustomPage> {
    return this.http.put<ICustomPage>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.UPDATE), {
      custom_page_id: customPageId,
      custom_page: dataForm,
    });
  }

  togglePublished(published, customPageId: number): Observable<ICustomPage> {
    return this.http.put<ICustomPage>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.UPDATE), {
      custom_page_id: customPageId,
      custom_page: {
        published: published,
      },
    });
  }

  getShow(customPageId, parentId, parentType: EDbModels): Observable<ICustomPage> {
    let params = new HttpParams().set('custom_page_id', customPageId);
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }

    return this.http.get<ICustomPage>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.SHOW), { params });
  }

  getPIndex(parentId: number | string, parentType: EDbModels): Observable<ICustomPage[]> {
    let params = new HttpParams();
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<ICustomPage[]>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.PUBLIC.INDEX), {
      params,
    });
  }

  getPShow(customPageId: number, parentId, parentType: EDbModels): Observable<ICustomPage> {
    let params = new HttpParams().set('custom_page_id', customPageId);
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<ICustomPage>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.PUBLIC.SHOW), { params });
  }

  destroy(customPageId: number): Observable<boolean> {
    const params = new HttpParams().set('custom_page_id', customPageId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.DELETE), { params });
  }

  getSlug(parentId, parentType: EDbModels, title: string): Observable<any> {
    let params = new HttpParams();
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.GET_SLUG),
      {
        custom_page: {
          title: title,
        },
      },
      { params },
    );
  }

  getRefundPolicyPage(parentId, parentType: EDbModels) {
    let params = new HttpParams();
    switch (parentType) {
      case EDbModels.KOMMUNITY: {
        params = params.set('community_id', parentId);
        break;
      }
      case EDbModels.COMMUNITY_GROUP: {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<ICustomPage>(this.apiRoutesService.getRoute(API_ROUTES.CUSTOM_PAGES.REFUND_POLICY_PAGE), {
      params,
    });
  }
}
