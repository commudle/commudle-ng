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

  constructor(private el: ElementRef, private IsBrowserService: IsBrowserService) { }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.canLazyLoad() && !this.isImageInViewport() ? this.lazyLoadImage() : this.loadImage();
    }
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private isImageInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
  }

  private lazyLoadImage() {
    const config = {
      rootMargin: '0px 0px 300px 0px',
      threshold: 0
    };

    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    }, config);
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
  }

}
