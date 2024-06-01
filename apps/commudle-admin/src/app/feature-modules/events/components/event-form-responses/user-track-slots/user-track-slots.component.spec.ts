import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrackSlotsComponent } from './user-track-slots.component';

describe('UserTrackSlotsComponent', () => {
  let component: UserTrackSlotsComponent;
  let fixture: ComponentFixture<UserTrackSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTrackSlotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTrackSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
