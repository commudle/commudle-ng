import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStreamingComponent } from './event-streaming.component';

describe('EventStreamingComponent', () => {
  let component: EventStreamingComponent;
  let fixture: ComponentFixture<EventStreamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventStreamingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
