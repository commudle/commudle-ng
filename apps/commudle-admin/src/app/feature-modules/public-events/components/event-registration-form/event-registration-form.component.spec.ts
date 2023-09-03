import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationFormComponent } from './event-registration-form.component';

describe('EventRegistrationFormComponent', () => {
  let component: EventRegistrationFormComponent;
  let fixture: ComponentFixture<EventRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
