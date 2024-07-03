import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[longPress]',
})
export class LongPressDirective {
  @Output() longPress = new EventEmitter<void>();
  private timeout: any;

  constructor() {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: Event) {
    this.timeout = setTimeout(() => {
      this.longPress.emit();
    }, 500); // Adjust the time threshold for a long press here (500ms)
  }

  @HostListener('touchend')
  onTouchEnd() {
    clearTimeout(this.timeout);
  }

  @HostListener('touchmove')
  onTouchMove() {
    clearTimeout(this.timeout);
  }
}
