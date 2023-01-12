import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRecordingsComponent } from './event-recordings.component';

describe('EventRecordingsComponent', () => {
  let component: EventRecordingsComponent;
  let fixture: ComponentFixture<EventRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRecordingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
