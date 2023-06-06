import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptChannelTokenConsentComponent } from './accept-channel-token-consent.component';

describe('AcceptChannelTokenConsentComponent', () => {
  let component: AcceptChannelTokenConsentComponent;
  let fixture: ComponentFixture<AcceptChannelTokenConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptChannelTokenConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptChannelTokenConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
