import { Injectable } from '@angular/core';
import { toHTML } from '@portabletext/to-html';
import { type ClientConfig, createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  config: ClientConfig = {
    projectId: 'r9a0cpxc',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
  };
  client = createClient(this.config);

  imageUrlBuilder = imageUrlBuilder(this.client);

  constructor() {}

  getDataBySlug(slug: string) {
    return from(this.client.fetch(`*[slug.current == "${slug}"]`)).pipe(map((data) => data[0]));
  }

  getDataByType(type: string) {
    return from(this.client.fetch(`*[_type == "${type}"]`));
  }

  getDataByTypeWithFilter(
    type: string,
    filterType: string,
    keyword: string,
    finalCount: number,
    initialCount: number = 0,
  ) {
    return from(
      this.client.fetch(`*[_type == "${type}" && $keyword in ${filterType}[]] [${initialCount}...${finalCount}]`, {
        keyword,
      }),
    );
  }

  getDataByTypeFieldOrder(type: string, fields: string, order?: string) {
    return from(this.client.fetch(`*[_type == "${type}"]{${fields}} | order(${order}) `));
  }

  getHtmlFromBlock(value: any, field: string = 'content'): any {
    return toHTML(value[field], {
      components: {
        types: {
          table: ({ value }) => {
            return `<table><tbody>${value.rows
              .map((row: { cells: string[] }) => {
                return `<tr>${row.cells.map((cell: string) => `<td>${cell}</td>`).join('')}</tr>`;
              })
              .join('')}</tbody></table>`;
          },
          image: ({ value }) => {
            return `<img src="${this.getImageUrl(value.asset)}" alt="${value.alt}" class="!com-max-w-full" />`;
          },
        },
      },
    });
  }

  getImageUrl(source: SanityImageSource): ImageUrlBuilder {
    return this.imageUrlBuilder.image(source);
  }
}
