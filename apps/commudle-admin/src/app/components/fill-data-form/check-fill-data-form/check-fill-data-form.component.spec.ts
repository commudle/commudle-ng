import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFillDataFormComponent } from './check-fill-data-form.component';

describe('CheckFillDataFormComponent', () => {
  let component: CheckFillDataFormComponent;
  let fixture: ComponentFixture<CheckFillDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckFillDataFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckFillDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
