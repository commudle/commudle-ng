import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminSurveysComponent } from './admin-surveys.component';

describe('AdminSurveysComponent', () => {
  let component: AdminSurveysComponent;
  let fixture: ComponentFixture<AdminSurveysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
