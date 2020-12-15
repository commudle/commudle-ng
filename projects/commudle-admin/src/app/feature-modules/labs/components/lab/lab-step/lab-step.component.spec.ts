import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabStepComponent } from './lab-step.component';

describe('LabStepComponent', () => {
  let component: LabStepComponent;
  let fixture: ComponentFixture<LabStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
