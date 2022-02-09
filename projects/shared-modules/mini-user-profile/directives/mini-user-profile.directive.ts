import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { MiniUserProfileComponent } from 'projects/shared-modules/mini-user-profile/components/mini-user-profile/mini-user-profile.component';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMiniUserProfile]',
})
export class MiniUserProfileDirective implements OnDestroy {
  componentRef: ComponentRef<MiniUserProfileComponent>;
  nativeElement: HTMLImageElement;
  subscriptions: Subscription[] = [];

  constructor(
    private inputElementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver,
  ) {
    this.nativeElement = this.inputElementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  onMouseOver(e) {
    this.loadComponent();
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  onMouseOut(e) {
    setTimeout(() => {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }, 200);
  }

  loadComponent() {
    const componentFactory = this._componentResolver.resolveComponentFactory(MiniUserProfileComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<MiniUserProfileComponent>(componentFactory);
    this.positionElement();
  }

  positionElement() {
    this.componentRef.location.nativeElement.firstChild.style.position = 'fixed';
    this.componentRef.location.nativeElement.firstChild.style.left = '50%';
    this.componentRef.location.nativeElement.firstChild.style.top = '50%';
  }
}
