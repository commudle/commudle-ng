import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventUpdatesComponent } from './event-updates.component';

describe('EventUpdatesComponent', () => {
  let component: EventUpdatesComponent;
  let fixture: ComponentFixture<EventUpdatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
