import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveysComponent } from './admin-surveys.component';

describe('AdminSurveysComponent', () => {
  let component: AdminSurveysComponent;
  let fixture: ComponentFixture<AdminSurveysComponent>;

  beforeEach(async(() => {
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
