import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHorizontalCardComponent } from './event-horizontal-card.component';

describe('EventsUpcomingComponent', () => {
  let component: EventHorizontalCardComponent;
  let fixture: ComponentFixture<EventHorizontalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventHorizontalCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventHorizontalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
