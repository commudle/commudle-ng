import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingHackathonsComponent } from './upcoming-hackathons.component';

describe('UpcomingHackathonsComponent', () => {
  let component: UpcomingHackathonsComponent;
  let fixture: ComponentFixture<UpcomingHackathonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingHackathonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingHackathonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
