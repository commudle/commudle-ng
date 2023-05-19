import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptJoinChannelEmailConsentComponent } from './accept-join-channel-email-consent.component';

describe('AcceptJoinChannelEmailConsentComponent', () => {
  let component: AcceptJoinChannelEmailConsentComponent;
  let fixture: ComponentFixture<AcceptJoinChannelEmailConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptJoinChannelEmailConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptJoinChannelEmailConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
