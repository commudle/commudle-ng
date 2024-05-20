import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsHeaderComponent } from './experts-header.component';

describe('ExpertsHeaderComponent', () => {
  let component: ExpertsHeaderComponent;
  let fixture: ComponentFixture<ExpertsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertsHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
