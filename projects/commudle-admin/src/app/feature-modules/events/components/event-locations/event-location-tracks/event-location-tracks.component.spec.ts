import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLocationTracksComponent } from './event-location-tracks.component';

describe('EventLocationTracksComponent', () => {
  let component: EventLocationTracksComponent;
  let fixture: ComponentFixture<EventLocationTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLocationTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLocationTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
