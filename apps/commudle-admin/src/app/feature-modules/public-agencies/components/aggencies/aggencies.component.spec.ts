import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggenciesComponent } from './aggencies.component';

describe('AggenciesComponent', () => {
  let component: AggenciesComponent;
  let fixture: ComponentFixture<AggenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggenciesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AggenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
