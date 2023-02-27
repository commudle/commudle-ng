import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventLocationsComponent } from './event-locations.component';

describe('EventLocationsComponent', () => {
  let component: EventLocationsComponent;
  let fixture: ComponentFixture<EventLocationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
