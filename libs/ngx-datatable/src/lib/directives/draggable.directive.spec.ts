import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DraggableDirective } from './draggable.directive';

@Component({
  selector: 'test-fixture-component',
  template: ` <div draggable></div> `
})
class TestFixtureComponent {}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element: any;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableDirective, TestFixtureComponent]
    });
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(TestFixtureComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
    })
  );

  describe('fixture', () => {
    let directive: DraggableDirective;

    beforeEach(() => {
      directive = fixture.debugElement.query(By.directive(DraggableDirective)).injector.get(DraggableDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have DraggableDirective directive', () => {
      expect(directive).toBeTruthy();
    });

    describe('mouse event', () => {
      let mouseDown: MouseEvent;

      beforeEach(() => {
        element.classList.add('draggable');
        mouseDown = <MouseEvent>{
          target: element,
          // tslint:disable-next-line
          preventDefault: () => {}
        };
      });

      // or else the document:mouseup event can fire again when resizing.
      describe('subscription should be destroyed', () => {
        it('when ngOnDestroy is called', () => {
          directive.onMousedown(mouseDown);
          expect(directive.subscription).toBeTruthy();

          directive.ngOnDestroy();

          expect(directive.subscription).toBeUndefined();
        });

        it('when onMouseup called and dragging', () => {
          directive.onMousedown(mouseDown);
          expect(directive.subscription).toBeTruthy();

          // tslint:disable-next-line: no-object-literal-type-assertion
          directive.onMouseup(<MouseEvent>{});

          expect(directive.subscription).toBeUndefined();
        });
      });

      describe('subscription should not be destroyed', () => {
        it('when onMouseup is called and not dragging', () => {
          directive.onMousedown(mouseDown);
          directive.isDragging = false;

          expect(directive.subscription).toBeTruthy();

          // tslint:disable-next-line: no-object-literal-type-assertion
          directive.onMouseup(<MouseEvent>{});

          expect(directive.subscription).toBeTruthy();
        });
      });
    });
  });
});
