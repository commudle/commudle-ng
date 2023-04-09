import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLocationTrackComponent } from './event-location-track.component';

describe('EventLocationTrackComponent', () => {
  let component: EventLocationTrackComponent;
  let fixture: ComponentFixture<EventLocationTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventLocationTrackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventLocationTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
