import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptEventVolunteerConsentComponent } from './accept-event-volunteer-consent.component';

describe('AcceptEventVolunteerConsentComponent', () => {
  let component: AcceptEventVolunteerConsentComponent;
  let fixture: ComponentFixture<AcceptEventVolunteerConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptEventVolunteerConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptEventVolunteerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
