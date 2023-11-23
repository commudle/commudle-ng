import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { map } from 'rxjs/operators';

const sanityClient = require('@sanity/client');
const blocksToHtml = require('@sanity/block-content-to-html');
const builder = require('@sanity/image-url');

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  projectId = 'r9a0cpxc';
  dataset = 'production';
  apiVersion = '2021-06-07';

  client = sanityClient({
    projectId: this.projectId,
    dataset: this.dataset,
    apiVersion: this.apiVersion, // use a UTC date string
    useCdn: true, // `false` if you want to ensure fresh data
  });
  imageUrlBuilder: ImageUrlBuilder = builder(this.client);
  private cmsUrl = `https://${this.projectId}.apicdn.sanity.io/v${this.apiVersion}/data/query/${this.dataset}`;

  constructor(private httpClient: HttpClient) {}

  getDataBySlug(slug: string) {
    const params = new HttpParams().set('query', `*[slug.current == "${slug}"]`);
    return this.httpClient.get(this.cmsUrl, { params }).pipe(map((data: any) => data.result[0]));
  }

  getDataByType(type: string) {
    const params = new HttpParams().set('query', `*[_type == "${type}"]`);
    return this.httpClient.get(this.cmsUrl, { params }).pipe(map((data: any) => data.result));
  }

  getDataByTypeWithFilter(type: string, filterType: string, keyword: string) {
    const params = new HttpParams()
      .set('query', `*[_type == "${type}" && $keyword in ${filterType}[]]`)
      .set('$keyword', `"${keyword}"`);
    return this.httpClient.get(this.cmsUrl, { params }).pipe(map((data: any) => data.result));
  }

  getDataByTypeFieldOrder(type: string, fields: string, order?: string) {
    const params = new HttpParams().set('query', `*[_type == "${type}"]{${fields}} | order(${order}) `);
    return this.httpClient.get(this.cmsUrl, { params }).pipe(map((data: any) => data.result));
  }

  getHtmlFromBlock(value: any, field: string = 'content'): any {
    return blocksToHtml({
      blocks: value[field],
      projectId: this.projectId,
      dataset: this.dataset,
    });
  }

  getImageUrl(source: SanityImageSource): ImageUrlBuilder {
    return this.imageUrlBuilder.image(source);
  }
}
