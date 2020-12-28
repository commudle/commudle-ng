import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventDashboardComponent } from './event-dashboard.component';

describe('EventDashboardComponent', () => {
  let component: EventDashboardComponent;
  let fixture: ComponentFixture<EventDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
