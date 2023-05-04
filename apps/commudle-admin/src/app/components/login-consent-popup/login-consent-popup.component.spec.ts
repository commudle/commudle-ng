import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConsentPopupComponent } from './login-consent-popup.component';

describe('LoginConsentPopupComponent', () => {
  let component: LoginConsentPopupComponent;
  let fixture: ComponentFixture<LoginConsentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginConsentPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginConsentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
