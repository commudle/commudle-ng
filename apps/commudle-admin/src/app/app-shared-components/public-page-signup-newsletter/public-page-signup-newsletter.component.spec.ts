import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageSignupNewsletterComponent } from './public-page-signup-newsletter.component';

describe('PublicPageSignupNewsletterComponent', () => {
  let component: PublicPageSignupNewsletterComponent;
  let fixture: ComponentFixture<PublicPageSignupNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicPageSignupNewsletterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicPageSignupNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
