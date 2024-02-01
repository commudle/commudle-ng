import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCheckedInListComponent } from './event-checked-in-list.component';

describe('EventCheckedInListComponent', () => {
  let component: EventCheckedInListComponent;
  let fixture: ComponentFixture<EventCheckedInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCheckedInListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCheckedInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
