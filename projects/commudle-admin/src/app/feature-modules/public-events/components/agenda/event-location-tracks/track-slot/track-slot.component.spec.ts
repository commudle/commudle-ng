import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSlotComponent } from './track-slot.component';

describe('TrackSlotComponent', () => {
  let component: TrackSlotComponent;
  let fixture: ComponentFixture<TrackSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
