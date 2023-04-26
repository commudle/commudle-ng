import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMediumCardComponent } from './event-medium-card.component';

describe('EventMediumCardComponent', () => {
  let component: EventMediumCardComponent;
  let fixture: ComponentFixture<EventMediumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMediumCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventMediumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
