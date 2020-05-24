import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedLinksComponent } from './highlighted-links.component';

describe('HighlightedLinksComponent', () => {
  let component: HighlightedLinksComponent;
  let fixture: ComponentFixture<HighlightedLinksComponent>;

  beforeEach(async(() => {
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
