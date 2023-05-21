import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptSingleClickRegistrationSpeakerConsentComponent } from './accept-single-click-registration-speaker-consent.component';

describe('AcceptSingleClickRegistrationSpeakerConsentComponent', () => {
  let component: AcceptSingleClickRegistrationSpeakerConsentComponent;
  let fixture: ComponentFixture<AcceptSingleClickRegistrationSpeakerConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptSingleClickRegistrationSpeakerConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptSingleClickRegistrationSpeakerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
