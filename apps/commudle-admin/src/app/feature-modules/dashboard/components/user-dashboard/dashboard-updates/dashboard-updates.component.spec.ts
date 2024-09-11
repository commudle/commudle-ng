import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpdatesComponent } from './dashboard-updates.component';

describe('DashboardUpdatesComponent', () => {
  let component: DashboardUpdatesComponent;
  let fixture: ComponentFixture<DashboardUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardUpdatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
