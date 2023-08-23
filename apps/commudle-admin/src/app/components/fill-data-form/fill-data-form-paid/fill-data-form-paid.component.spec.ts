import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillDataFormPaidComponent } from './fill-data-form-paid.component';

describe('FillDataFormPaidComponent', () => {
  let component: FillDataFormPaidComponent;
  let fixture: ComponentFixture<FillDataFormPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillDataFormPaidComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FillDataFormPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
