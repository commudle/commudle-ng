import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventScheduleComponent } from './event-schedule.component';

describe('EventScheduleComponent', () => {
  let component: EventScheduleComponent;
  let fixture: ComponentFixture<EventScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
