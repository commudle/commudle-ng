import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptEventFormRegistrationConsentComponent } from './accept-event-form-registration-consent.component';

describe('AcceptEventFormRegistrationConsentComponent', () => {
  let component: AcceptEventFormRegistrationConsentComponent;
  let fixture: ComponentFixture<AcceptEventFormRegistrationConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptEventFormRegistrationConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptEventFormRegistrationConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
