import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FillDataFormComponent } from './fill-data-form.component';

describe('FillDataFormComponent', () => {
  let component: FillDataFormComponent;
  let fixture: ComponentFixture<FillDataFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FillDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
