import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLocationsComponent } from './event-locations.component';

describe('EventLocationsComponent', () => {
  let component: EventLocationsComponent;
  let fixture: ComponentFixture<EventLocationsComponent>;

  beforeEach(async(() => {
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
