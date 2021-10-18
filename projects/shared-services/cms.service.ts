import { Injectable } from '@angular/core';
import sanityClient, { SanityClient } from '@sanity/client';
import { from } from 'rxjs';
import sanityImageUrlBuilder from '@sanity/image-url';

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

  imageUrlBuiler;

  constructor() {
    this.imageUrlBuiler = sanityImageUrlBuilder(this.client);
  }

  getData(slug: string) {
    const query: string = `*[slug.current == "${slug}"][0]`;
    return from(this.client.fetch(query));
  }

  getHtmlFromBlock(value: any, field: string = 'content') {
    return blocksToHtml({
      blocks: value[field],
      projectId: this.projectId,
      dataset: this.dataset,
    });
  }

  getImageUrl(source) {
    return this.imageUrlBuiler.image(source);
  }
}
