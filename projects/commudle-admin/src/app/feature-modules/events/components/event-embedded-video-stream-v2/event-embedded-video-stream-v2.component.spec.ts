import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmbeddedVideoStreamV2Component } from './event-embedded-video-stream-v2.component';

describe('EventEmbeddedVideoStreamV2Component', () => {
  let component: EventEmbeddedVideoStreamV2Component;
  let fixture: ComponentFixture<EventEmbeddedVideoStreamV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventEmbeddedVideoStreamV2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEmbeddedVideoStreamV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
