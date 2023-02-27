import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsCardComponent } from './labs-card.component';

describe('LabsCardComponent', () => {
  let component: LabsCardComponent;
  let fixture: ComponentFixture<LabsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
