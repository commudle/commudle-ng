import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptEventOneClickRegistrationConsentComponent } from './accept-event-one-click-registration-consent.component';

describe('AcceptEventOneClickRegistrationConsentComponent', () => {
  let component: AcceptEventOneClickRegistrationConsentComponent;
  let fixture: ComponentFixture<AcceptEventOneClickRegistrationConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptEventOneClickRegistrationConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptEventOneClickRegistrationConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
