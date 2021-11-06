import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Directive({
  selector: 'img',
  providers: [IsBrowserService],
})
export class LazyLoadImagesDirective implements AfterContentInit, OnChanges {
  @HostBinding('attr.src') srcAttr;
  @Input() src: string;

  private isBrowser: boolean = this.IsBrowserService.isBrowser();

  constructor(private el: ElementRef, private IsBrowserService: IsBrowserService, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    if (this.isBrowser) {
      this.addClass('remove-image');
      this.srcAttr = null;
      this.canLazyLoad() && !this.isImageInViewport() ? this.lazyLoadImage() : this.loadImage();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.src) {
      if (!changes.src.firstChange && changes.src.previousValue !== changes.src.currentValue) {
        this.srcAttr = changes.src.currentValue;
      }
    }
  }

  addClass(className: string) {
    this.renderer.addClass(this.el.nativeElement, className);
  }

  removeClass(className: string) {
    this.renderer.removeClass(this.el.nativeElement, className);
  }

  private canLazyLoad(): boolean {
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

  private lazyLoadImage(): void {
    const config: IntersectionObserverInit = {
      rootMargin: '0px 0px 300px 0px',
      threshold: 0,
    };

    const obs: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    }, config);
    obs.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    this.srcAttr = this.src;
    this.removeClass('remove-image');
  }
}
