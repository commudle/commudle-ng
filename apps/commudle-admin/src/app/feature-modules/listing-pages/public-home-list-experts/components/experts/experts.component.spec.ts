import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsComponent } from './experts.component';

describe('ExpertsComponent', () => {
  let component: ExpertsComponent;
  let fixture: ComponentFixture<ExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
