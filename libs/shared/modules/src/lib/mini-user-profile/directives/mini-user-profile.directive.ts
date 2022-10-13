import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { IMiniUserProfile } from '@commudle/shared-models';
import { Subscription } from 'rxjs';
import { MiniUserProfileComponent } from '../components/mini-user-profile/mini-user-profile.component';
import { debounce } from '../helpers/debounce';
import { MiniUserProfileService } from '../services/mini-user-profile.service';

@Directive({
  selector: '[commudleMiniUserProfile]',
})
export class MiniUserProfileDirective implements OnDestroy {
  @Input() username: string;
  @Input() activateMiniProfileDirective = true;

  componentRef: ComponentRef<MiniUserProfileComponent>;
  nativeElement: any;
  subscriptions: Subscription[] = [];
  miniUser: IMiniUserProfile;
  cursorOnPopover = false;
  private coords: { top: number; left: number } = { top: 0, left: 0 };

  constructor(
    private inputElementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    // TODO: Refactor this
    private _componentResolver: ComponentFactoryResolver,
    private miniUserProfileService: MiniUserProfileService,
  ) {
    this.nativeElement = this.inputElementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  @HostListener('mouseenter')
  onMouseOver() {
    this.createComponent();
  }

  @HostListener('mouseleave')
  onMouseOut() {
    this.destroyComponent();
  }

  loadComponent() {
    const popupContainer = document.getElementById('mini-user-profile-container');
    const componentFactory = this._componentResolver.resolveComponentFactory(MiniUserProfileComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<MiniUserProfileComponent>(componentFactory);
    if (popupContainer.childNodes.length === 0) {
      popupContainer.appendChild(this.componentRef.location.nativeElement);
    } else {
      popupContainer.replaceChild(this.componentRef.location.nativeElement, popupContainer.childNodes[0]);
    }

    this.subscriptions.push(
      this.componentRef.instance.popupHover.subscribe((data) => {
        this.cursorOnPopover = data;
        if (!this.cursorOnPopover) {
          this.destroyComponent();
        }
      }),
      this.componentRef.instance.closeMiniProfile.subscribe((data) => {
        if (data) {
          this.cursorOnPopover = false;
          this.destroyComponent();
        }
      }),
    );
    this.componentRef.instance.username = this.username;
    this.componentRef.instance.miniUser = this.miniUser;
    this.positionElement();
  }

  createComponent() {
    if (this.activateMiniProfileDirective) {
      this.subscriptions.push(
        this.miniUserProfileService.getUserMiniProfile(this.username).subscribe((response) => {
          if (response) {
            this.miniUser = response;
            this.loadComponent();
            window.requestAnimationFrame(() => {
              this.getElementCoordinates();
              this.positionElement();
            });
          }
        }),
      );
    }
  }

  @debounce(50)
  destroyComponent() {
    if (!this.cursorOnPopover && this.componentRef) {
      this.componentRef.destroy();
    }
  }

  getElementCoordinates() {
    const popoverHeight = this.componentRef.location.nativeElement.firstChild.getBoundingClientRect().height;
    const popoverWidth = this.componentRef.location.nativeElement.firstChild.getBoundingClientRect().width;
    const nativeElementRect = this.nativeElement.getBoundingClientRect();
    const navbarHeight = 56;
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = window.innerHeight - navbarHeight;

    //offsets
    const offsetTop = 20;
    const offsetBottom = 20;
    const offsetLeft = 20;
    const offsetRight = 20;

    //position on x-axis calculation
    const leftLength = nativeElementRect.left;
    const rightLength = windowWidth - nativeElementRect.right;

    if (leftLength > rightLength) {
      this.coords.left = leftLength - popoverWidth - offsetLeft;
    } else {
      this.coords.left = nativeElementRect.right + offsetRight;
    }

    //position on y-axis calculation
    const topLength = nativeElementRect.top;
    const bottomLength = windowHeight - nativeElementRect.bottom;

    if (topLength > bottomLength) {
      this.coords.top = topLength - popoverHeight + offsetTop;
    } else {
      this.coords.top = nativeElementRect.bottom - offsetBottom;
    }

    this.coords.top += window.pageYOffset;
  }

  positionElement() {
    this.componentRef.location.nativeElement.firstChild.style.position = 'absolute';
    this.componentRef.location.nativeElement.firstChild.style.left = this.coords.left + 'px';
    this.componentRef.location.nativeElement.firstChild.style.top = this.coords.top + 'px';
  }
}
