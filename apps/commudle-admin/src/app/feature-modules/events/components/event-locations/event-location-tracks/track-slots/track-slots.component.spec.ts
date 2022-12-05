import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSlotsComponent } from './track-slots.component';

describe('TrackSlotsComponent', () => {
  let component: TrackSlotsComponent;
  let fixture: ComponentFixture<TrackSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackSlotsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
