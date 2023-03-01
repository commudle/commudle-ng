import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { InViewportService } from 'libs/in-viewport/src/lib/services';
import { Config } from 'libs/in-viewport/src/lib/values';
import { filter, takeUntil } from 'rxjs/operators';
import { DestroyableDirective } from './destroyable.directive';

export const InViewportMetadata = Symbol('InViewportMetadata');

export interface InViewportAction {
  [InViewportMetadata]: { entry?: IntersectionObserverEntry };
  target: HTMLElement | SVGElement | Element;
  visible: boolean;
}

export type InViewportOptions = ConstructorParameters<typeof Config>[0];

@Directive({
  standalone: true,
  selector: '[inViewport]',
  providers: [DestroyableDirective],
  // hostDirectives: [DestroyableDirective], // TODO: only in angular 15
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  @Output() public readonly inViewportAction = new EventEmitter<InViewportAction>();
  @Output() public readonly inViewportCustomCheck = new EventEmitter<unknown>();
  private config = new Config({});

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly elementRef: ElementRef<Element>,
    private readonly inViewportService: InViewportService,
    private readonly destroyable: DestroyableDirective,
  ) {}

  @Input('inViewportOptions')
  public set options(options: InViewportOptions) {
    this.config = new Config(options);
  }

  private get nativeElement(): Element {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewportService.trigger$
        .pipe(
          filter((entry) => entry.target === this.nativeElement),
          takeUntil(this.destroyable.destroyed$),
        )
        .subscribe((entry) => {
          this.emit(entry, false);
          this.changeDetectorRef.markForCheck();
        });

      this.inViewportService.register(this.nativeElement, this.config);
    } else {
      this.emit(undefined, true);
    }
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewportService.unregister(this.nativeElement, this.config);
    }
  }

  private isVisible(entry: IntersectionObserverEntry): boolean {
    return this.config.partial ? entry.isIntersecting || entry.intersectionRatio > 0 : entry.intersectionRatio >= 1;
  }

  private emit(entry: IntersectionObserverEntry, force: false): void;
  private emit(entry: undefined, force: true): void;
  private emit(entry: IntersectionObserverEntry | undefined, force: boolean): void {
    this.inViewportAction.emit({
      [InViewportMetadata]: { entry },
      target: this.nativeElement,
      visible: force || !entry || this.isVisible(entry),
    });

    if (this.config.checkFn) {
      this.inViewportCustomCheck.emit(this.config.checkFn(entry, { force, config: this.config }));
    }
  }
}
