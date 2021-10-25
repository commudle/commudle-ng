import { Injectable } from '@angular/core';
import sanityClient, { SanityClient } from '@sanity/client';
import builder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { from, Observable } from 'rxjs';

const blocksToHtml = require('@sanity/block-content-to-html');

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  projectId = 'r9a0cpxc';
  dataset = 'production';

  client: SanityClient = sanityClient({
    projectId: this.projectId,
    dataset: this.dataset,
    apiVersion: '2021-06-07', // use a UTC date string
    useCdn: true, // `false` if you want to ensure fresh data
  });
  imageUrlBuilder: ImageUrlBuilder = builder(this.client);

  constructor() {}

  getDataBySlug(slug: string): Observable<any> {
    const query: string = `*[slug.current == "${slug}"][0]`;
    return from(this.client.fetch(query));
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
