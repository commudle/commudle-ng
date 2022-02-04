import { Router as router } from '@angular/router';
import { ISearchResult } from 'projects/shared-models/search.model';

export function groupResults(value: ISearchResult[]): {} {
  return value.reduce((r, a) => {
    r[a.type] = [...(r[a.type] || []), a];
    return r;
  }, {});
}

export function navigate(option: ISearchResult): void {
  switch (option.type) {
    case 'User':
      this.router.navigate(['/users', option['username']]);
      break;
    case 'Lab':
      this.router.navigate(['/labs', option['slug']]);
      break;
    case 'Kommunity':
      this.router.navigate(['/communities', option['slug']]);
      break;
    case 'CommunityBuild':
      this.router.navigate(['/builds', option['slug']]);
      break;
    case 'Event':
      this.router.navigate(['/communities', option['kommunity_slug'], 'events', option['slug']]);
      break;
    case 'all':
      this.router.navigate(['/search'], { queryParams: { q: option['query'] } });
      break;
  }
}

export function getPicture(option: ISearchResult): string {
  switch (option.type) {
    case 'User':
      return 'avatar' in option ? option.avatar : '';
    case 'Lab':
      return 'header_image' in option ? option.header_image?.i32 : '';
    case 'Kommunity':
      return 'logo_image' in option ? option.logo_image?.i32 : '';
    case 'CommunityBuild':
      return 'images' in option ? option.images[0]?.i32 : '';
    case 'Event':
      return 'header_image' in option ? option.header_image?.i32 : '';
  }
}

function convertHtmlToText(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value.replace(/<[^>]+>/g, '');
}

export function getTitle(option: ISearchResult): string {
  switch (option.type) {
    case 'User':
      return 'designation' in option ? option.designation : '';
    case 'Lab':
      return 'description' in option ? convertHtmlToText(option.description) : '';
    case 'Kommunity':
      return 'about' in option ? convertHtmlToText(option.about) : '';
    case 'CommunityBuild':
      return 'description' in option ? convertHtmlToText(option.description) : '';
    case 'Event':
      return 'description' in option ? convertHtmlToText(option.description) : '';
  }
}
