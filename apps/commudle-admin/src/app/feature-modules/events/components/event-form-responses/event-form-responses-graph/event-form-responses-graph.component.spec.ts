import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormResponsesGraphComponent } from './event-form-responses-graph.component';

describe('EventFormResponsesGraphComponent', () => {
  let component: EventFormResponsesGraphComponent;
  let fixture: ComponentFixture<EventFormResponsesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventFormResponsesGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormResponsesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
