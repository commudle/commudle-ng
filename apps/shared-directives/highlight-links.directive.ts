import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightLinks]'
})
export class HighlightLinksDirective {

  private readonly id;
  private readonly regex = /^(?:https?|ftp|file):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  constructor(
    private elementRef: ElementRef
  ) {
    this.id = setTimeout(() => this.getText());
  }

  getText(): void {
    this.elementRef.nativeElement.innerHTML = this.highlightText(this.elementRef.nativeElement.innerHTML);
    clearTimeout(this.id);
  }

  highlightText(text: string): string {
    const safeContent = text.replace(this.regex, (url) => {
      const address = /[a-z]+:\/\//.test(url) ? url : 'http://' + url;
      return `<a href='${ address }' target='_blank'>${ url }</a>`;
    });
    return safeContent.replace(/\n/g, '<br/>');
  }

}
