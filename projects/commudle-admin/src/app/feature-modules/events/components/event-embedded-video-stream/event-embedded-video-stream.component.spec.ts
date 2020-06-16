import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmbeddedVideoStreamComponent } from './event-embedded-video-stream.component';

describe('EventEmbeddedVideoStreamComponent', () => {
  let component: EventEmbeddedVideoStreamComponent;
  let fixture: ComponentFixture<EventEmbeddedVideoStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEmbeddedVideoStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEmbeddedVideoStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
