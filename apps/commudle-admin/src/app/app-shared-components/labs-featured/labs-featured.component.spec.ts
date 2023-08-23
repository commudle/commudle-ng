import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsFeaturedComponent } from './labs-featured.component';

describe('LabsFeaturedComponent', () => {
  let component: LabsFeaturedComponent;
  let fixture: ComponentFixture<LabsFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabsFeaturedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabsFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
