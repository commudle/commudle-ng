import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHackathonRegistrationsComponent } from './event-hackathon-registrations.component';

describe('EventHackathonRegistrationsComponent', () => {
  let component: EventHackathonRegistrationsComponent;
  let fixture: ComponentFixture<EventHackathonRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventHackathonRegistrationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventHackathonRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
