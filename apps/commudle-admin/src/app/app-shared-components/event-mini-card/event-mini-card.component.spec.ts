import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMiniCardComponent } from './event-mini-card.component';

describe('EventMiniCardComponent', () => {
  let component: EventMiniCardComponent;
  let fixture: ComponentFixture<EventMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMiniCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
