import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAttendanceComponent } from './auto-attendance.component';

describe('AutoAttendanceComponent', () => {
  let component: AutoAttendanceComponent;
  let fixture: ComponentFixture<AutoAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
