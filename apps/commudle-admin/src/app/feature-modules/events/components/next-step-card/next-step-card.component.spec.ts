import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStepCardComponent } from './next-step-card.component';

describe('NextStepCardComponent', () => {
  let component: NextStepCardComponent;
  let fixture: ComponentFixture<NextStepCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextStepCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NextStepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
