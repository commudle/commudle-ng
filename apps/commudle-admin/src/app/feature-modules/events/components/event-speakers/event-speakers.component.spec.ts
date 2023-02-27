import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventSpeakersComponent } from './event-speakers.component';

describe('EventSpeakersComponent', () => {
  let component: EventSpeakersComponent;
  let fixture: ComponentFixture<EventSpeakersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSpeakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
