import { Directive, ElementRef, HostBinding, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img'
})
export class LazyLoadImagesDirective {

  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    console.log(this.src)
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
