import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Directive({
  selector: 'img',
  providers: [IsBrowserService]
})
export class LazyLoadImagesDirective {

  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;

  private isBrowser: boolean = this.IsBrowserService.isBrowser();

  constructor(private el: ElementRef, private IsBrowserService : IsBrowserService) {}

  ngAfterViewInit() {
    if(this.isBrowser){
      this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
    }
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
  }

}
