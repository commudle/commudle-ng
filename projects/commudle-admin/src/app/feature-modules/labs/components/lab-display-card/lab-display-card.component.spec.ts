import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDisplayCardComponent } from './lab-display-card.component';

describe('LabDisplayCardComponent', () => {
  let component: LabDisplayCardComponent;
  let fixture: ComponentFixture<LabDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
