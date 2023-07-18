import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationsComponent } from './event-registrations.component';

describe('EventRegistrationsComponent', () => {
  let component: EventRegistrationsComponent;
  let fixture: ComponentFixture<EventRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
