import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSlotFormComponent } from './track-slot-form.component';

describe('TrackSlotFormComponent', () => {
  let component: TrackSlotFormComponent;
  let fixture: ComponentFixture<TrackSlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackSlotFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
