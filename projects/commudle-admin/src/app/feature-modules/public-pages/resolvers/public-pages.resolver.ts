import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CmsService } from 'projects/shared-services/cms.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicPagesResolver implements Resolve<boolean> {
  constructor(private cmsService: CmsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug: string = route.paramMap.get('name');

    return this.cmsService.getDataBySlug(slug);
  }
}
