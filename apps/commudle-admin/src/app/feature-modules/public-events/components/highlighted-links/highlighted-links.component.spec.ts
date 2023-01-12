import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HighlightedLinksComponent } from './highlighted-links.component';

describe('HighlightedLinksComponent', () => {
  let component: HighlightedLinksComponent;
  let fixture: ComponentFixture<HighlightedLinksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightedLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
