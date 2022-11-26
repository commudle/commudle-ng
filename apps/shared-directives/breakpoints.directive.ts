import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appBreakpoints]',
})
export class BreakpointsDirective {
  private breakpoints = [
    {
      name: 'sm',
      value: 640,
    },
    {
      name: 'md',
      value: 768,
    },
    {
      name: 'lg',
      value: 1024,
    },
    {
      name: 'xl',
      value: 1280,
    },
    {
      name: '2xl',
      value: 1536,
    },
  ];

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input()
  set appBreakpoints(value: '<=sm' | '<=md' | '<=lg' | '<=xl' | '<=2xl' | '>sm' | '>md' | '>lg' | '>xl' | '>2xl') {
    const sign = value.charAt(0);
    const breakpoint = this.breakpoints.find((b) => {
      return b.name === value.substr(sign === '<' ? 2 : 1);
    });

    if (breakpoint) {
      const condition = sign === '<' ? window.innerWidth <= breakpoint.value : window.innerWidth > breakpoint.value;
      this.updateLayout(condition);
    }
  }

  updateLayout(condition: boolean) {
    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
