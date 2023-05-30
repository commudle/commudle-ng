import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCommunityOrganizerConsentComponent } from './accept-community-organizer-consent.component';

describe('AcceptCommunityOrganizerConsentComponent', () => {
  let component: AcceptCommunityOrganizerConsentComponent;
  let fixture: ComponentFixture<AcceptCommunityOrganizerConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptCommunityOrganizerConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptCommunityOrganizerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
