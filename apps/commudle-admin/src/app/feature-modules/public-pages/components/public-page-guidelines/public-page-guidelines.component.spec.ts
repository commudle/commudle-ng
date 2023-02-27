import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageGuidelinesComponent } from './public-page-guidelines/public-page-guidelines.component';

describe('PublicPageGuidelinesComponent', () => {
  let component: PublicPageGuidelinesComponent;
  let fixture: ComponentFixture<PublicPageGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicPageGuidelinesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPageGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
