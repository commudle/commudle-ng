import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'completeurl' })
export class CompleteUrlPipe implements PipeTransform {
  transform(url: string, urlType: string = '') {
    if (!/(http(s?)):\/\//i.test(url)) {
      switch (urlType) {
        case '':
          return `https://${url}`;
        case 'twitter':
          if (url.includes('twitter') || url.includes('t.co')) {
            return `https://${url}`;
          } else {
            return `https://twitter.com/${url}`;
          }
        // case 'linkedin':
        //   if (url.includes('linkedin')) {
        //     return `https://${url}`;
        //   } else {
        //     return `https://linkedin.com/${url}`;
        //   }
        // case 'github':
        //   if (url.includes('github')) {
        //     return `https://${url}`;
        //   } else {
        //     return `https://github.com/${url}`;
        //   }
        default:
          if (url.includes(urlType)) {
            return `https://${url}`;
          } else {
            return `https://${urlType}.com/${url}`;
          }
      }
    }
    return url;
  }
}
