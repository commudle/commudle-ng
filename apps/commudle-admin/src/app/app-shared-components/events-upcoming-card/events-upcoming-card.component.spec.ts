import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsUpcomingCardComponent } from './events-upcoming-card.component';

describe('EventsUpcomingComponent', () => {
  let component: EventsUpcomingCardComponent;
  let fixture: ComponentFixture<EventsUpcomingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsUpcomingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsUpcomingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
