import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinChannelConsentComponent } from './join-channel-consent.component';

describe('JoinChannelConsentComponent', () => {
  let component: JoinChannelConsentComponent;
  let fixture: ComponentFixture<JoinChannelConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinChannelConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinChannelConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
