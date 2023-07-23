import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsVolunteerListComponent } from './events-volunteer-list.component';

describe('EventsVolunteerListComponent', () => {
  let component: EventsVolunteerListComponent;
  let fixture: ComponentFixture<EventsVolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsVolunteerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsVolunteerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
