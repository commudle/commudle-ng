import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightLinks]'
})
export class HighlightLinksDirective {

  private readonly id;
  // TODO: Below regex can be made better
  private readonly regex = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;

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
      return `<a href='${address}' target='_blank'>${url}</a>`;
    });
    return safeContent.replace(/\n/g, '<br/>');
  }

}
