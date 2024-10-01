import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallForSpeakerCardComponent } from './call-for-speaker-card.component';

describe('CallForSpeakerCardComponent', () => {
  let component: CallForSpeakerCardComponent;
  let fixture: ComponentFixture<CallForSpeakerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallForSpeakerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallForSpeakerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
