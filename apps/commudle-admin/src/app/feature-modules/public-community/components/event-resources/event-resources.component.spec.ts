import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventResourcesComponent } from './event-resources.component';

describe('EventResourcesComponent', () => {
  let component: EventResourcesComponent;
  let fixture: ComponentFixture<EventResourcesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
