import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventDescriptionComponent } from './event-description.component';

describe('EventDescriptionComponent', () => {
  let component: EventDescriptionComponent;
  let fixture: ComponentFixture<EventDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
