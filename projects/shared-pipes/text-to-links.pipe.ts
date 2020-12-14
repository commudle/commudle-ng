import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textToLinks' })
export class TextToLinksPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml((text || "").replace(
      /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
      this.matchText
    ).replace(/@(\w+)/g, '<a href="/users/$1">@$1</a>'));
  }

  matchText (match, space, url){
    let hyperlink = url;
    if (!hyperlink.match('^https?:\/\/')) {
      hyperlink = 'http://' + hyperlink;
    }
    return space + '<a target="_blank" href="' + hyperlink + '">' + url + '</a>';
  }
}



