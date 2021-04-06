import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'completeurl' })
export class CompleteUrlPipe implements PipeTransform {

  transform(url: string, urlType: string = '') {
    if (!(/(http(s?)):\/\//i.test(url))) {
      switch (urlType) {
        case '':
          return `http://${url}`;
        case 'twitter':
          if (url.includes('twitter') || url.includes('t.co')) {
            return `http://${url}`;
          } else {
            return `http://twitter.com/${url}`;
          }
        // case 'linkedin':
        //   if (url.includes('linkedin')) {
        //     return `http://${url}`;
        //   } else {
        //     return `http://linkedin.com/${url}`;
        //   }
        // case 'github':
        //   if (url.includes('github')) {
        //     return `http://${url}`;
        //   } else {
        //     return `http://github.com/${url}`;
        //   }
        default:
          if (url.includes(urlType)) {
            return `http://${url}`;
          } else {
            return `http://${urlType}.com/${url}`;
          }

      }

    }
    return url;
  }
}
