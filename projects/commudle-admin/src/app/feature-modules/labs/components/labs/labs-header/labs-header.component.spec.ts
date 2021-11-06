import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsHeaderComponent } from './labs-header.component';

describe('LabsHeaderComponent', () => {
  let component: LabsHeaderComponent;
  let fixture: ComponentFixture<LabsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabsHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
