import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { IMiniUserProfile } from 'projects/shared-models/mini-user-profile.model';
import { MiniUserProfileComponent } from 'projects/shared-modules/mini-user-profile/components/mini-user-profile/mini-user-profile.component';
import { debounce } from 'projects/shared-modules/mini-user-profile/helpers/debounce';
import { MiniUserProfileService } from 'projects/shared-modules/mini-user-profile/services/mini-user-profile.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMiniUserProfile]',
})
export class MiniUserProfileDirective implements OnDestroy, OnInit, AfterViewInit {
  @Input() username: string;
  @Input() activateMiniProfileDirective: boolean = true;
  componentRef: ComponentRef<MiniUserProfileComponent>;
  nativeElement: any;
  subscriptions: Subscription[] = [];
  miniUser: IMiniUserProfile;
  cursorOnPopover: boolean = false;
  cursorOnParent: boolean = false;

  private coords: { top: number; left: number } = { top: 0, left: 0 };

  constructor(
    private inputElementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver,
    private miniUserProfileService: MiniUserProfileService,
    private scrollDispatcher: ScrollDispatcher,
  ) {
    this.nativeElement = this.inputElementRef.nativeElement;
  }
  ngOnInit(): void {
    // console.log('ngOnInit');
    // console.log(this.activateMiniProfileDirective, 'ngOnInit');
  }

  ngAfterViewInit(): void {
    // console.log(this.componentRef, 'ngAfterViewInit');
    if (!this.cursorOnPopover && !this.cursorOnParent) {
      this.destroyComponent();
    }
    // this.scrollDispatcher.scrolled().subscribe(() => {
    //   if (!this.cursorOnPopover && !this.cursorOnParent) {
    //     console.log('scrollable');
    //     this.destroyComponent();
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  @HostListener('mouseenter')
  onMouseOver() {
    this.cursorOnParent = true;
    this.createComponent();
    // console.log(this.cursorOnParent, 'onMouseOver');
  }
  @HostListener('onscroll')
  onScroll() {
    // this.cursorOnParent = true;
    // this.createComponent();
    console.log('onScroll');
  }

  @HostListener('mouseleave')
  onMouseOut() {
    this.cursorOnParent = false;
    if (!this.cursorOnPopover) {
      this.destroyComponent();
      // console.log(this.cursorOnParent, 'mouseleave');
    }
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
        if (!this.cursorOnPopover && !this.cursorOnParent) {
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
    setTimeout(() => {
      // console.log(this.cursorOnPopover, this.componentRef, 'destroyComponent');

      if (!this.cursorOnPopover && this.componentRef && !this.cursorOnParent) {
        console.log('Component Destroyed');
        // console.log('setTimeout');
        this.componentRef.destroy();
      }
    }, 1000);
    // console.log('destroyComponent');

    // if (!this.cursorOnPopover && this.componentRef) {
    //   this.componentRef.destroy();
    // }
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
