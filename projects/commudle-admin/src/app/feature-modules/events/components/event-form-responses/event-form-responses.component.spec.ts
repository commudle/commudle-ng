import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormResponsesComponent } from './event-form-responses.component';

describe('EventFormResponsesComponent', () => {
  let component: EventFormResponsesComponent;
  let fixture: ComponentFixture<EventFormResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFormResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
