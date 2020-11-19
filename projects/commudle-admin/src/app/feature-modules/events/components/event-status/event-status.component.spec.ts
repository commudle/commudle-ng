import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventStatusComponent } from './event-status.component';

describe('EventStatusComponent', () => {
  let component: EventStatusComponent;
  let fixture: ComponentFixture<EventStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
